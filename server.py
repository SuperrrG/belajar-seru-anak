import http.server, socketserver

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

ip = "127.0.0" + ".1"
with socketserver.TCPServer((ip, 8080), NoCacheHandler) as httpd:
    print("Server siap di: http://" + ip + ":8080")
    httpd.serve_forever()
