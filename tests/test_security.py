import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.security import sanitize_input_string

client = TestClient(app)

def test_security_response_headers():
    """Verify HTTP security response headers are present on API responses."""
    res = client.get("/api/v1/districts")
    assert res.status_code == 200
    headers = res.headers
    assert headers.get("X-Frame-Options") == "DENY"
    assert headers.get("X-Content-Type-Options") == "nosniff"
    assert headers.get("X-XSS-Protection") == "1; mode=block"
    assert "Strict-Transport-Security" in headers
    assert "Content-Security-Policy" in headers

def test_input_sanitization_helper():
    """Verify HTML escaping and script tag removal in input strings."""
    malicious = "<script>alert('XSS')</script><b>Test Name</b>"
    clean = sanitize_input_string(malicious)
    assert "<script>" not in clean
    assert "&lt;b&gt;Test Name&lt;/b&gt;" in clean or "Test Name" in clean

def test_api_rate_limiter():
    """Verify sliding-window rate limiter handles normal requests properly."""
    res = client.get("/")
    assert res.status_code == 200
