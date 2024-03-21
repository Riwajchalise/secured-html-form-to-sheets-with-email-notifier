## Google Sheets Form Handler & Email Notifier

This project provides a Google Apps Script for handling form submissions and sending email notifications when new submissions are received. It is designed to work with Google Sheets as a backend to store form data that only accepts data to be accepted form a specific domain hence cross-origin resource sharing (CORS) configuration is also managed.

### Getting Started

1. Set up a Google Sheets Spreadsheet
- Create a new Google Sheets spreadsheet or use an existing one to store your form submissions.
- Make sure the name of the first sheet is "Sheet1" or change the name according to the name of the sheet. 

2. Set up the Google Apps Script
- Open Google Sheets and go to Extensions > Apps Script.
- Replace the contents of the script editor with the provided code from the code.gs file in this repository.
- You need to replace 2 important variables in the script.
    - The email that will receive the notification  **const recipientEmail = '*test@email.com*'**
    - The domain name form whis the form will be submitted make sure to enter as in this example   **const allowedDomain = '*https://yourdomain.com*';**
    - You Can also update other subject and body variables which is completely optional.
![Variable to replace](images/variable-to-replace.png "Variables to replace")


3. Deploy the Script as a Web App
- Once you are done with writing the script go to **Deploy > New Deployment**
- Write a discription for the deployment and on **Who can access > Anyone**
- Once you have done this copy the webapp url and put in in some safe location we will need this while interigating in your form.
![Web App URL](images/app-url.png "Web App URL")

4. Create A trigger 
- On the left hand side of the  app script windo select the clock icon which is a trigger.
- Click on the Add trigger button.
- **Choose which function to run > doPost()**
- **Select event type > On Form Submit**
- Save the trigger
![Trigger](images/trigger.png "Trigger Settings")








 