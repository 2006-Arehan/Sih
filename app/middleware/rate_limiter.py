import time
from collections import defaultdict
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse, Response

class RateLimiterMiddleware(BaseHTTPMiddleware):
    """In-Memory Sliding Window Rate Limiting Middleware.
    Tracks client IP request rates and enforces maximum request thresholds per minute."""

    def __init__(self, app, max_requests_per_minute: int = 120):
        super().__init__(app)
        self.max_requests_per_minute = max_requests_per_minute
        self.request_records = defaultdict(list)

    async def dispatch(self, request: Request, call_next) -> Response:
        # Exclude static assets from strict rate limiting
        if request.url.path.startswith("/static"):
            return await call_next(request)

        client_ip = request.client.host if request.client else "127.0.0.1"
        now = time.time()
        window_start = now - 60.0

        # Filter timestamps within current 60-second window
        timestamps = [ts for ts in self.request_records[client_ip] if ts > window_start]
        self.request_records[client_ip] = timestamps

        if len(timestamps) >= self.max_requests_per_minute:
            return JSONResponse(
                status_code=429,
                content={
                    "detail": "Rate limit exceeded. Too many requests.",
                    "status": 429,
                    "retry_after_seconds": 60
                },
                headers={"Retry-After": "60"}
            )

        self.request_records[client_ip].append(now)
        return await call_next(request)
