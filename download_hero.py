import urllib.request
import os

url = "https://images.unsplash.com/photo-1600596542815-600025529871?auto=format&fit=crop&w=1920&q=80"
output_path = "d:/clone/New PropoertyNama/public/images/hero-bg.jpg"

# Create directory if it doesn't exist
os.makedirs(os.path.dirname(output_path), exist_ok=True)

try:
    print(f"Downloading {url} to {output_path}...")
    urllib.request.urlretrieve(url, output_path)
    print("Download successful!")
except Exception as e:
    print(f"Error downloading image: {e}")
