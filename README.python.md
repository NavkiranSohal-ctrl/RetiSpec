# Flask Backend for Over-Illumination and AI Readiness Check (app.py)

## Overview
The app.py file provides Flask-based endpoints for processing Fundus images. It handles two primary functions:
1. Detecting over-illumination in uploaded images.
2. Checking if patient images are ready for AI analysis based on quality and illumination factors.

#### Flask App Setup 
This initializes the Flask app and enables Cross-Origin Resource Sharing (CORS), allowing requests from different origins.
```javascript
app = Flask(__name__)
CORS(app)
```

## Over-Illumination Detection
This function detects over-illumination in images by calculating pixel luminance and average brightness.
- **Luminance Calculation**: Converts image pixels to luminance values using RGB channels with perceptual weights.
- **Over-Exposed Pixels**: Detects pixels with luminance exceeding a given threshold.
- **Brightness Check**: Ensures the average brightness is below a certain level to prevent over-illumination.

```javascript
def overIlluminated(image_path: str, luminance: float = 0.9, overexposure: int = 230, overexposure: float = 50.0) -> str:

```
The function returns "Yes" if the image is over-illuminated and "No" if it is not.


## AI Readiness Check 
This function checks if a patient’s retinal images meet the necessary quality, anatomy, and over-illumination criteria for AI analysis.
It ensures that images with poor quality or over-exposure are excluded from AI processing.
```javascript
def aiReady(patient_data):

```

## Routes 
- **/lookoverillumination:**: Endpoint for checking if an image is over-illuminated. Accepts a POST request with an image file. Returns "Yes" if the image is over-illuminated and "No" otherwise..
- **/checkaireadinesss**: Endpoint to check if the patient’s images are ready for AI processing. Accepts a POST request with patient data and evaluates the AI readiness based on image attributes.

## Decision for Adding Key Points
- Added checks like average brightness and overexposed pixel ratios for more accuracy in over-illumination detection.
- Used perceptual luminance with RGB channel weights for a more human-eye-like interpretation of brightness.
- Added the aiReady function to ensure images are of a high enough quality before being processed for AI detection.


## Future Improvements

- Plan to add resizing, cropping, and filtering to improve image quality before detection.
- Utilize comprehensive logging and exception handling to track image upload and processing stages.
- Prepare for the integration of cloud storage services (AWS S3 or Google Cloud, for example) for scalable image storing and processing.
