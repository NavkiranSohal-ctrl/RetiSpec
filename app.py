from flask import Flask, request, jsonify
from flask_cors import CORS  
import cv2
import numpy as np
from PIL import Image
import os

app = Flask(__name__)
CORS(app)  

PX_MAX_VALUE = 255.0

if not os.path.exists('temp'):
    os.makedirs('temp')


def is_over_illuminated(image_path: str, luminance_threshold: float = 0.9, overexposure_threshold: int = 230, overexposure_ratio_threshold: float = 50.0) -> str:
    try:
        img = Image.open(image_path)
        img_array = np.array(img)

        
        if img_array.shape[2] == 4:
            img_array = img_array[:, :, :3]

       
        luminance = (0.2126 * img_array[:, :, 0] + 
                     0.7152 * img_array[:, :, 1] + 
                     0.0722 * img_array[:, :, 2]) / PX_MAX_VALUE

       
        overexposed_mask = luminance > luminance_threshold
        overexposed_pixels = np.sum(overexposed_mask)
        total_pixels = overexposed_mask.size
        overexposure_ratio = (overexposed_pixels / total_pixels) * 100

       
        img_bgr = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)
        gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
        mean_brightness = np.mean(gray)

        
        if mean_brightness > overexposure_threshold and overexposure_ratio > overexposure_ratio_threshold:
            return "Yes"
        elif overexposed_pixels > 0:
            return "Yes"

        return "No"
    
    except Exception as e:
        print(f"Error processing image: {e}")
        return "Error"

@app.route('/check_over_illumination', methods=['POST'])
def check_over_illumination():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image_file = request.files['image']
    image_path = os.path.join('temp', image_file.filename)
    image_file.save(image_path)

    print(f"Processing image: {image_path}")

    result = is_over_illuminated(image_path)

    try:
        os.remove(image_path)
    except Exception as e:
        print(f"Error removing temporary file: {e}")

    return jsonify({"result": result})


def is_ai_ready(patient_data):
    for eye in patient_data.get("eyes", []):
        has_valid_image = any(
            img["quality_score"] in ["High", "Acceptable"]
            and img["anatomy_score"] in ["Good", "Acceptable"]
            and img["over_illuminated"] == "No"
            for img in eye.get("images", [])
        )

        if not has_valid_image:
            return False  

    return True  

@app.route('/check_ai_readiness', methods=['POST'])
def check_ai_readiness():
    try:
        data = request.json
        if not data or "patients" not in data:
            return jsonify({"error": "Invalid request format. Missing 'patients' key"}), 400

        results = []
        for patient in data["patients"]:
            patient["AI_ready"] = "Yes" if is_ai_ready(patient) else "No"
            results.append(patient)

        return jsonify({"patients": results})  

    except Exception as e:
        print(f"Error in /check_ai_readiness: {e}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(debug=False)
