# Chatbot Project

This project consists of two folders: `server` and `website`. The `server` folder contains the Python backend code for the chatbot, while the `website` folder contains the frontend website for interacting with the chatbot.

## Server

The `server` folder contains the Python backend code using FastAPI to handle chatbot requests. It provides different responses based on the type of chatbot selected by the user. The backend also serves as an intermediary between the user interface and the NLP model or any other logic you might implement.

### Setup

1. Navigate to the `server` folder.
2. Install the required dependencies using pip:

'''
pip install fastapi uvicorn
'''

3. Run the server using UVicorn:
'''
uvicorn main:app --reload
'''


## Website

The `website` folder contains the frontend website for the chatbot interface. It's built using HTML, CSS, and JavaScript. The website allows users to select the type of chatbot flow and interact with the chatbot accordingly.

### Setup

1. Navigate to the `website` folder.
2. Open the `index.html` file in a web browser or set up a local server to host the website files.

## Usage

1. Start the backend server by following the setup instructions in the `server` folder.
2. Open the `index.html` file from the `website` folder in a web browser.
3. Select the type of chatbot flow (e.g., Book a Room, SPA, Request a Quote).
4. Interact with the chatbot by typing messages in the input field and pressing Enter or clicking the Send button.

## Additional Notes

- The backend server currently provides static responses based on the selected type of chatbot. You can expand this by integrating NLP models or other APIs for more dynamic responses.
- Styling and functionality enhancements can be made to the website according to your preferences and requirements.

Feel free to reach out if you have any questions or need further assistance!