from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """ASGI Middleware to inject enterprise HTTP Security Headers into all HTTP responses.
    Protects against Clickjacking, MIME-sniffing, XSS attacks, and unencrypted transport."""

    async def dispatch(self, request: Request, call_next) -> Response:
        response: Response = await call_next(request)
        
        # Security Response Headers
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=(), payment=()"
        
        # Permissive CSP tailored for Leaflet.js maps, Google Fonts, and embedded media
        csp_directives = (
            "default-src 'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'; "
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com; "
            "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com https://unpkg.com; "
            "font-src 'self' data: https://fonts.gstatic.com; "
            "img-src 'self' data: blob: https: http:; "
            "connect-src 'self' http: https: ws: wss:;"
        )
        response.headers["Content-Security-Policy"] = csp_directives
        
        return response
