# Web simulation of Windows

This is a personal portfolio website of theme Windows, made using Next.js & tailwind CSS.
If you want to edit this. Clone this project and edit the files in `/src/components`.

To run this on localhost
type `npm start` and when u are done coding type `npm run build` to build your app.

_NOTE: if you have yarn just replace `npm start` and `npm run build` with `yarn start` and `yarn build`._

### To make the contact form work

- Create a account in [emailjs](https://www.emailjs.com/) create also new Outlook or Gmail account to be able
  to send email.
- Create a new service, select and log in to your newly created outlook or gmail account on EmailJS.
- Go back to the dashboard and get the Service ID copy it.
- Create a .env file in your root folder and put

```
NEXT_PUBLIC_USER_ID = 'YOUR_USER_ID'
NEXT_PUBLIC_TEMPLATE_ID = 'template_cq712x7'
NEXT_PUBLIC_SERVICE_ID = 'YOUR_SERVICE_ID'
NEXT_PUBLIC_TEMPLATE_ID_OTP = 'template_bp7f6bt'
NEXT_PUBLIC_SERVICE_ID_OTP = 'YOUR_OTP_MAIL_SERVICE_ID'
```

into it. Replace your user id and your service ID with your values in your EmailJS service. If you have one email address for sending OTP and another for receiving email, you would need two different service IDs.

## This project was made using Create Next App! Here is the scripts that you can run.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributors who wants to make this website better can make contribution,which will be **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Added some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
