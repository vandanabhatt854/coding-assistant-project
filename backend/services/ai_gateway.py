import os
import json
from typing import Optional
from openai import AsyncOpenAI

# Mock responses for demonstration when API Gateway is unavailable
MOCK_RESPONSES = {
    'generate': {
        "content": "Here's a simple Hello World function for you:",
        "code": "function helloWorld() {\n  return 'Hello, World!';\n}\n\nconsole.log(helloWorld());",
        "language": "javascript"
    },
    'explain': {
        "content": "This function creates a simple greeting message. It defines a function called 'helloWorld' that returns the string 'Hello, World!'. The function doesn't take any parameters and simply returns a static string.",
        "language": "javascript"
    },
    'optimize': {
        "content": "This code is already very simple and optimized. For best practices, you could add JSDoc comments for documentation.",
        "code": "/**\n * Returns a simple greeting message\n * @returns {string} The greeting message\n */\nconst helloWorld = () => 'Hello, World!';\n\nconsole.log(helloWorld());",
        "language": "javascript"
    },
    'debug': {
        "content": "This code looks correct and has no bugs. It's a basic function that returns a string.",
        "code": "function helloWorld() {\n  return 'Hello, World!';\n}\n\nconsole.log(helloWorld());",
        "language": "javascript"
    }
}


class AIGateway:
    """Wrapper for Vercel AI Gateway API"""

    def __init__(self):
        self.api_key = os.getenv('AI_GATEWAY_API_KEY')
        if not self.api_key:
            raise ValueError("AI_GATEWAY_API_KEY environment variable is not set")
        # Initialize OpenAI client - uses OPENAI_API_KEY or falls back to mock responses
        self.openai_key = os.getenv('OPENAI_API_KEY')
        self.client = None
        if self.openai_key:
            self.client = AsyncOpenAI(api_key=self.openai_key)
        else:
            print("[v0] Warning: OPENAI_API_KEY not set, using mock responses only")

    async def generate(self, prompt: str) -> dict:
        """Generate code from a prompt"""
        system_prompt = """You are an expert code generator. When given a request, generate clean, well-documented code.
        Always include comments and follow best practices.
        Return your response in this JSON format:
        {
            "content": "explanation of what was generated",
            "code": "the generated code",
            "language": "the programming language"
        }"""

        return await self._call_ai(
            model="gpt-4-turbo",
            system=system_prompt,
            user_prompt=prompt,
            service_type="generate",
        )

    async def explain(self, code: str) -> dict:
        """Explain code in simple language"""
        system_prompt = """You are a helpful code explanation assistant. Explain the provided code clearly and concisely,
        breaking it down into simple concepts. Make it understandable for beginners.
        Return your response in this JSON format:
        {
            "content": "clear explanation of the code",
            "language": "the programming language detected"
        }"""

        return await self._call_ai(
            model="gpt-4-turbo",
            system=system_prompt,
            user_prompt=f"Please explain this code:\n\n{code}",
            service_type="explain",
        )

    async def optimize(self, code: str) -> dict:
        """Optimize code for performance and readability"""
        system_prompt = """You are an expert code optimization specialist. Analyze the given code and suggest improvements
        for performance, readability, and best practices. Provide the optimized version.
        Return your response in this JSON format:
        {
            "content": "explanation of optimizations made",
            "code": "the optimized code",
            "language": "the programming language"
        }"""

        return await self._call_ai(
            model="gpt-4-turbo",
            system=system_prompt,
            user_prompt=f"Please optimize this code:\n\n{code}",
            service_type="optimize",
        )

    async def debug(self, code: str, error: Optional[str] = None) -> dict:
        """Identify and fix bugs in code"""
        if error:
            debug_prompt = f"Please debug this code. Error message: {error}\n\nCode:\n{code}"
        else:
            debug_prompt = f"Please identify any bugs or issues in this code:\n\n{code}"

        system_prompt = """You are an expert debugger. Analyze the code for bugs, issues, and potential problems.
        Provide clear explanations of what's wrong and show how to fix it.
        Return your response in this JSON format:
        {
            "content": "description of bugs found and how to fix them",
            "code": "the corrected code",
            "language": "the programming language"
        }"""

        return await self._call_ai(
            model="gpt-4-turbo",
            system=system_prompt,
            user_prompt=debug_prompt,
            service_type="debug",
        )

    async def _call_ai(self, model: str, system: str, user_prompt: str, service_type: str = 'generate') -> dict:
        """Generic method to call OpenAI API or use mock responses"""
        try:
            if not self.client:
                print(f"[v0] No OpenAI client, using mock response for {service_type}")
                return MOCK_RESPONSES.get(service_type, {"content": "Service unavailable"})
            
            print(f"[v0] Calling OpenAI API with model: gpt-3.5-turbo")
            
            response = await self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system},
                    {"role": "user", "content": user_prompt},
                ],
                temperature=0.7,
                max_tokens=2000,
            )

            message_content = response.choices[0].message.content
            print(f"[v0] AI Response received: {message_content[:100]}...")
            
            # Try to parse as JSON, otherwise return as plain text
            try:
                result = json.loads(message_content)
                return result
            except json.JSONDecodeError:
                # Return the content as a structured response
                return {
                    "content": message_content,
                    "language": self._detect_language(message_content)
                }

        except Exception as e:
            print(f"[v0] AI call failed: {str(e)}, using mock response for {service_type}")
            # Fall back to mock response
            return MOCK_RESPONSES.get(service_type, {"content": f"Error: {str(e)}"})
    
    def _detect_language(self, content: str) -> str:
        """Detect programming language from content"""
        content_lower = content.lower()
        
        if '```python' in content_lower or 'def ' in content_lower:
            return 'python'
        elif '```javascript' in content_lower or 'function ' in content_lower:
            return 'javascript'
        elif '```java' in content_lower or 'public class' in content_lower:
            return 'java'
        elif '```cpp' in content_lower or '#include' in content_lower:
            return 'cpp'
        elif '```csharp' in content_lower or 'using System' in content_lower:
            return 'csharp'
        elif '```typescript' in content_lower or ': string' in content_lower:
            return 'typescript'
        else:
            return 'javascript'  # Default to JavaScript

    async def close(self):
        """Close the HTTP client"""
        await self.client.aclose()
