# Firebase Whatsapp OTP Authentication

This projects helps to deploy firebase functions and use firestore to provide Whatsapp Authentication for your projects.

## Support

For support, email <param@codingmantra.com> and mobile number +91-9033596484.

## 🚀 About Me

I'm a full stack developer who loves pizza and code. I am fulltime freelancer and owner of CodigMantra.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`AUTH_SECRET_KEY` = Your Random AUTH Secret Key
`CODINGMANTRA_AI_API_URL` = <https://codingmantra.ai/api/create-message>
`CODINGMANTRA_AI_APP_KEY` = Your CodingMantra AI App Key
`CODINGMANTRA_AI_AUTH_KEY` = Your CodingMantra AI Auth Key
`OTP_ALLOWED_CHAR_OR_NUMBERS` = Allowed character you want to use for OTP
`OTP_LENGTH` = OTP Length
`OTP_EXPIRE_MINUTES` = OTP expire minutes

## Features

- Whatsapp OTP Authentication
- Integration with CodingMantra AI for sending Whatsapp messages
- Secured webtoken with secret key encription
- Secured otp validation using secret key decription
- Firebase Functions
- Firebase Admin
- Firebase Functions Logger
- Node Express Handling
- Node Router Support
- Node Middleware for Secret Key Validations
- Node CORS > Cross Origin Handling

## API Reference

### Initiate Auth Request and Send Message

```http
  POST /auth/create
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `contact` | `string` | **Required**. Whatsapp Number to intiate Auth |

#### You will receive encrypted token which will be used in validate OTP

### Validate OTP

```http
  POST /auth/validate
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Encrypted token received from create auth |
| `otp`      | `string` | **Required**. OTP received on whatsapp |


## Authors

- [@mehtaparam](https://www.github.com/mehtaparam)

![CodingMantra Logo](https://codingmantra.com/assets/webp/woman.webp)
