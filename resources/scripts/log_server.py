from http.server import BaseHTTPRequestHandler, HTTPServer
import json

logFile = "/usr/src/app/log.csv"
hostName = "0.0.0.0"
serverPort = 8081

class FileHolder:
    file = None

holder = FileHolder()

class MyServer(BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', '*')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super(MyServer, self).end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        content_len = int(self.headers.get('Content-Length'), 0)
        body_raw = str(self.rfile.read(content_len).decode('utf-8'))
        print(body_raw)
        body = json.loads(body_raw)
        holder.file.write(f"{body['browser']},{body['app']},{body['event']},{body['size']},{body['time']}\n")
        holder.file.flush()
        self.send_response(200)
        self.end_headers()

if __name__ == "__main__":
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        with open(logFile, "a") as f:
            holder.file = f
            webServer.serve_forever()
    except KeyboardInterrupt:
        pass
    
    webServer.server.close()
    print("Server stopped")