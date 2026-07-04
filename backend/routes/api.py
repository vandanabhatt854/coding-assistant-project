from flask import Blueprint, request, jsonify
from functools import wraps
import asyncio
from backend.services.ai_gateway import AIGateway

api_bp = Blueprint('api', __name__, url_prefix='/api')

# Initialize AI Gateway
ai_gateway = None


def init_ai_gateway(app):
    """Initialize AI Gateway with app context"""
    global ai_gateway
    ai_gateway = AIGateway()


def async_route(f):
    """Decorator to run async functions in Flask"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            loop = asyncio.get_event_loop()
            if loop.is_closed():
                raise RuntimeError("Event loop is closed")
        except RuntimeError:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
        
        try:
            result = loop.run_until_complete(f(*args, **kwargs))
            return result
        except Exception as e:
            print(f"[v0] Async route error: {str(e)}")
            raise
    return decorated_function


@api_bp.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({"status": "healthy"}), 200


@api_bp.route('/generate', methods=['POST'])
@async_route
async def generate_code():
    """Generate code from prompt"""
    try:
        data = request.get_json()
        prompt = data.get('prompt')

        if not prompt:
            return jsonify({"error": "prompt is required"}), 400

        result = await ai_gateway.generate_code(prompt)

        if result.get('error'):
            return jsonify(result), 500

        return jsonify(result), 200

    except Exception as e:
        print(f"[v0] Error in generate_code: {str(e)}")
        return jsonify({"error": str(e), "content": "Failed to generate code"}), 500


@api_bp.route('/explain', methods=['POST'])
@async_route
async def explain_code():
    """Explain code"""
    try:
        data = request.get_json()
        code = data.get('code')

        if not code:
            return jsonify({"error": "code is required"}), 400

        result = await ai_gateway.explain_code(code)

        if result.get('error'):
            return jsonify(result), 500

        return jsonify(result), 200

    except Exception as e:
        print(f"[v0] Error in explain_code: {str(e)}")
        return jsonify({"error": str(e), "content": "Failed to explain code"}), 500


@api_bp.route('/optimize', methods=['POST'])
@async_route
async def optimize_code():
    """Optimize code"""
    try:
        data = request.get_json()
        code = data.get('code')

        if not code:
            return jsonify({"error": "code is required"}), 400

        result = await ai_gateway.optimize_code(code)

        if result.get('error'):
            return jsonify(result), 500

        return jsonify(result), 200

    except Exception as e:
        print(f"[v0] Error in optimize_code: {str(e)}")
        return jsonify({"error": str(e), "content": "Failed to optimize code"}), 500


@api_bp.route('/debug', methods=['POST'])
@async_route
async def debug_code():
    """Debug code"""
    try:
        data = request.get_json()
        code = data.get('code')
        error = data.get('error', None)

        if not code:
            return jsonify({"error": "code is required"}), 400

        result = await ai_gateway.debug_code(code, error)

        if result.get('error'):
            return jsonify(result), 500

        return jsonify(result), 200

    except Exception as e:
        print(f"[v0] Error in debug_code: {str(e)}")
        return jsonify({"error": str(e), "content": "Failed to debug code"}), 500
