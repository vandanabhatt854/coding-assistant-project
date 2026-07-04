"""
Main Flask application for the Code Assistant backend
"""
import os
from flask import Flask, jsonify
from flask_cors import CORS
from backend.config import get_config
from backend.routes.api import api_bp, init_ai_gateway


def create_app():
    """Application factory"""
    app = Flask(__name__)

    # Load configuration
    config = get_config()
    app.config.from_object(config)

    # Initialize CORS
    CORS(
        app,
        origins=config.CORS_ORIGINS,
        methods=['GET', 'POST', 'OPTIONS'],
        allow_headers=['Content-Type', 'Authorization'],
        supports_credentials=True,
    )

    # Initialize AI Gateway
    try:
        init_ai_gateway(app)
    except ValueError as e:
        print(f"[v0] Warning: {str(e)}")
        # Continue without AI Gateway - we'll handle it at runtime

    # Register blueprints
    app.register_blueprint(api_bp)

    # Register error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Not found"}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({"error": "Internal server error"}), 500

    @app.before_request
    def before_request():
        """Request preprocessing"""
        pass

    @app.after_request
    def after_request(response):
        """Response postprocessing"""
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        return response

    # Root endpoint
    @app.route('/')
    def index():
        return jsonify({
            "name": "Code Assistant API",
            "version": "1.0.0",
            "status": "running",
        }), 200

    return app


if __name__ == '__main__':
    app = create_app()
    config = get_config()
    app.run(
        host=config.HOST,
        port=config.PORT,
        debug=config.DEBUG,
        use_reloader=config.DEBUG,
    )
