// import React, { useState } from "react";
// import { Formik, Form } from "formik";
// import { TextFeild } from "./TextFeild";
// import { Nav, Image } from "react-bootstrap";
// import { useDispatch } from "react-redux";
// import * as Yup from "yup";
// import facebook from "../../assets/icons/facebook.svg";
// import google from "../../assets/icons/google.svg";
// import { useHistory } from "react-router-dom";
// import Loader from "../../UpdatedStore/components/Loader";
// import Message from "../../UpdatedStore/components/Message";
// import { AUTHENTICATION_SUCCESS } from "../../UpdatedStore/constants/constants";
// import { TextFeildPassword } from "./TextFieldPassword";
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

// import Button from 'react-bootstrap/Button'
// import Form1 from 'react-bootstrap/Form'
// import Images from "../../landingPage/component/Images/Images";
// import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
// import auth from "./FirebaseLogin";


// import { BASE_URL } from "../../utils/index"

// const domain_url = BASE_URL;
// // const provider = new GoogleAuthProvider();
// // const facebook_provider = new FacebookAuthProvider();

// const LoginForm: React.FC = () => {

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '508px',
//     // height: '308px',
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
//     borderRadius: '24px',
//     backgroundColor: 'white',
//     outline: 'none',
//   };

//   const inputTextStyle = {
//     backgroundColor: '#F6F7F8',
//     marginTop: '20px',
//     borderRadius: '12px',
//     height: '48px',
//     border: 'none',
//   };

//   const buttonFormat = {
//     width: '100%',
//     backgroundColor: '#3ED0A3',
//     border: 'none',
//     marginTop: '30px',
//     color: 'white',
//     fontFamily: 'Montserrat',
//     fontWeight: '700',
//     borderRadius: '24px',
//     height: '42px'
//   };

//   const paragraphFormat = {
//     marginTop: '12px',
//     fontFamily: 'Montserrat',
//     fontStyle: 'normal',
//     fontWeight: 500,
//     fontSize: '15px',
//     lineHeight: '24px',
//     color: '#777C85',
//   };

//   const closeButtonFormat = {
//     float: 'right',
//     backgroundColor: '#E8ECF0',
//     color: '#777C85',
//     padding: '4px',
//   };

//   const titleFormat = {
//     fontFamily: 'Montserrat',
//     fontStyle: 'normal',
//     fontWeight: 700,
//     fontSize: '22px',
//     lineHeight: '22px', letterSpacing: '0.275px',
//     color: '#16284D'
//   }


//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const history = useHistory();
//   const [show, setShow] = useState<boolean>(false)

//   const currentUrl = history.location.search;
//   const urlParams = new URLSearchParams(currentUrl);
//   const new_account = urlParams.get("new_account");

//   const [message, setMessage] = useState("");
//   const [email, setEmail] = useState("");



//   const validate = Yup.object({
//     email: Yup.string().email("Email is invalid").required("Email Required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password Required"),
//   });

//   const loginHandler = async (values, setSubmitting) => {
//     try {
//       const url = domain_url + "/merchant/authenticate/token/";
//       const res = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//           username: values.email,
//           password: values.password,
//           grant_type: "password",
//           client_id: "bVxX1q5UYDI6ulp7exsK6apjvbKvyjO8PzOXy8Vi",
//           client_secret:
//             "UJLpRpm6l13NJGbVrWGP37kI3p6B6sQT4pfiLgQnfBrV6bXVQ3oxCFc3D5CwS8PmlrZL3M2ZFzQ5ZuWoGdppVR1j4ciGQPDP9UowUj1uTcRPSu4edusECqIyRk9N1mDx",
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(
//           data.detail
//             ? data.detail
//             : data.error_description
//               ? data.error_description
//               : "Your  Request could not be processed!"
//         );
//       }

//       dispatch({ type: AUTHENTICATION_SUCCESS, payload: data });
//       localStorage.setItem("userDetails", JSON.stringify(data));
//       history.push("/dashboard");
//       setSubmitting(false);
//     } catch (error) {
//       if (error instanceof Error) {
//         setMessage(error.message);
//         setSubmitting(false);
//       }
//     }
//   };

//   const responseFacebook = async (response) => {
//     try {


//       const url = domain_url + "/merchant/authenticate/convert-token/";
//       const res = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//           token: response.accessToken,
//           backend: "facebook",
//           grant_type: "convert_token",
//           client_id: "bVxX1q5UYDI6ulp7exsK6apjvbKvyjO8PzOXy8Vi",
//           client_secret:
//             "UJLpRpm6l13NJGbVrWGP37kI3p6B6sQT4pfiLgQnfBrV6bXVQ3oxCFc3D5CwS8PmlrZL3M2ZFzQ5ZuWoGdppVR1j4ciGQPDP9UowUj1uTcRPSu4edusECqIyRk9N1mDx",
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error("Your  Request could not be processed!");
//       }

//       dispatch({ type: AUTHENTICATION_SUCCESS, payload: data });
//       localStorage.setItem("userDetails", JSON.stringify(data));
//       history.push("/dashboard");
//     } catch (error) {
//       if (error instanceof Error) {
//         setMessage(error.message);
//       }
//     }
//   };

//   const responseGoogle = async (response) => {
//     try {

//       const url = domain_url + "/merchant/authenticate/convert-token/";
//       const res = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//           token: response.accessToken,
//           backend: "google-oauth2",
//           grant_type: "convert_token",
//           client_id: "bVxX1q5UYDI6ulp7exsK6apjvbKvyjO8PzOXy8Vi",
//           client_secret:
//             "UJLpRpm6l13NJGbVrWGP37kI3p6B6sQT4pfiLgQnfBrV6bXVQ3oxCFc3D5CwS8PmlrZL3M2ZFzQ5ZuWoGdppVR1j4ciGQPDP9UowUj1uTcRPSu4edusECqIyRk9N1mDx",
//         }),
//       });

//       const data = await res.json();
//       console.log(res)
//       if (!res.ok) {
//         throw new Error("Your  Request could not be processed!");
//       }

//       dispatch({ type: AUTHENTICATION_SUCCESS, payload: data });
//       localStorage.setItem("userDetails", JSON.stringify(data));
//       history.push("/dashboard");
//     } catch (error) {
//       if (error instanceof Error) {
//         setMessage(error.message);
//       }
//     }
//   };

//   const forgetpasswordHandler = async (response) => {
//     try {

//       const url = domain_url + "/api/reset-password/";
//       const res = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           grant_type: "password",
//           client_id: "bVxX1q5UYDI6ulp7exsK6apjvbKvyjO8PzOXy8Vi",
//           client_secret:
//             "UJLpRpm6l13NJGbVrWGP37kI3p6B6sQT4pfiLgQnfBrV6bXVQ3oxCFc3D5CwS8PmlrZL3M2ZFzQ5ZuWoGdppVR1j4ciGQPDP9UowUj1uTcRPSu4edusECqIyRk9N1mDx",
//         }),
//       });
//       if (!res.ok) {
//         if (res.status === 404)
//           throw new Error("Email not found");
//         throw new Error("Bad Request");
//       }
//       handleClose();
//       setShow(true);
//     } catch (error) {
//       if (error instanceof Error) {
//         setMessage(error.message);
//       }
//     }
//   }

//   const responseFail = (response) => {
//     console.log("Your  Request could not be processed!");
//   };

//   const FormikPatchTouched = () => {
//     // const { setSubmitting, isSubmitting } = useFormikContext();
//     // useEffect(() => {
//     //   setSubmitting(true);
//     // }, [isSubmitting, setSubmitting]);
//     return null;
//   };
//   const [values, setValues] = React.useState({
//     password: '',
//     showPassword: false,
//   });

//   const handleChange = (prop) => (event) => {
//     setValues({ ...values, [prop]: event.target.value });
//   };

//   const handleClickShowPassword = () => {
//     setValues({
//       ...values,
//       showPassword: !values.showPassword,
//     });
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <Formik
//       initialValues={{
//         email: "",
//         password: "",
//       }}
//       onSubmit={(values, { setSubmitting }) => {
//         loginHandler(values, setSubmitting);
//       }}
//       validationSchema={validate}
//       validateOnMount
//     >
//       {({ isSubmitting }) => (
//         <div className="_auth_form">
//           <FormikPatchTouched />
//           <h1 className="title font-weight-bold" style={{ textAlign: 'center', margin: 'auto' }}>SIGN IN</h1>

//           {isSubmitting && <Loader />}
//           {!isSubmitting && message && (
//             <Message variant="danger">{message}</Message>
//           )}
//           {new_account && new_account === "created" && (
//             <Message variant="success">
//               Account was created successfuly, Please check Email and activated the account !
//             </Message>
//           )}
//           <Form className="form-responsiveness">
//             <TextFeild
//               label="Email"
//               name="email"
//               type="email"
//               placholder="Enter your email"
//             />
//             {/* <TextFeild
//               label="Password"
//               name="password"
//               type="password"
//               placholder="Enter your password"
//             /> */}

//             <TextFeildPassword
//               label="Password"
//               name="password"
//               values={values}
//               placholder="Enter your password"
//               type={values.showPassword ? 'text' : 'password'}
//               value={values.password}
//               onChange={handleChange('password')}
//               handleMouseDownPassword={handleMouseDownPassword}
//               handleClickShowPassword={handleClickShowPassword}
//             />

//             {/* button for opening forgot password model */}
//             <p className="forgotPassStyle" onClick={handleOpen}>Forgot Password</p>

//             <Button
//               role="button"
//               type="submit"
//               className={`auth_button ${!isSubmitting ? "dis_bg" : ""}`}
//               disabled={isSubmitting}
//             >
//               Sign In
//             </Button>

//             <Nav.Item>
//               <Nav.Link href="/sign-up" className="route_to_login">
//                 Don’t have account yet? Sign up
//               </Nav.Link>
//             </Nav.Item>
//             <div className="or">
//               <span>
//                 <svg
//                   width="20"
//                   height="13"
//                   viewBox="0 0 20 13"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M6.54225 12.16C5.40092 12.16 4.37158 11.9147 3.45425 11.424C2.53692 10.9227 1.81692 10.2347 1.29425 9.36C0.771583 8.47467 0.51025 7.488 0.51025 6.4C0.51025 5.312 0.771583 4.33067 1.29425 3.456C1.81692 2.57067 2.53692 1.88267 3.45425 1.392C4.37158 0.890666 5.40092 0.639999 6.54225 0.639999C7.68358 0.639999 8.71292 0.890666 9.63025 1.392C10.5476 1.88267 11.2676 2.56533 11.7902 3.44C12.3129 4.31467 12.5743 5.30133 12.5743 6.4C12.5743 7.49867 12.3129 8.48533 11.7902 9.36C11.2676 10.2347 10.5476 10.9227 9.63025 11.424C8.71292 11.9147 7.68358 12.16 6.54225 12.16ZM6.54225 10.336C7.28892 10.336 7.96092 10.1707 8.55825 9.84C9.15558 9.49867 9.62492 9.02933 9.96625 8.432C10.3076 7.824 10.4783 7.14667 10.4783 6.4C10.4783 5.65333 10.3076 4.98133 9.96625 4.384C9.62492 3.776 9.15558 3.30667 8.55825 2.976C7.96092 2.63467 7.28892 2.464 6.54225 2.464C5.79558 2.464 5.12358 2.63467 4.52625 2.976C3.92892 3.30667 3.45958 3.776 3.11825 4.384C2.77692 4.98133 2.60625 5.65333 2.60625 6.4C2.60625 7.14667 2.77692 7.824 3.11825 8.432C3.45958 9.02933 3.92892 9.49867 4.52625 9.84C5.12358 10.1707 5.79558 10.336 6.54225 10.336ZM16.691 4.704C17.267 3.808 18.2803 3.36 19.731 3.36V5.264C19.5603 5.232 19.4057 5.216 19.267 5.216C18.4883 5.216 17.8803 5.44533 17.443 5.904C17.0057 6.352 16.787 7.00267 16.787 7.856V12H14.787V3.456H16.691V4.704Z"
//                     fill="#9AA1AF"
//                   />
//                 </svg>
//               </span>
//             </div>

//             <div className="log_social">
//               <Button
//                 role="button"
//                 className="facebook"
//                 onClick={() => {
//                   // signInWithPopup(auth, facebook_provider)
//                   //   .then((result) => {
//                   //     const credential = FacebookAuthProvider.credentialFromResult(result)
//                   //     responseFacebook(credential);

//                   //   }).catch((error) => {
//                   //     console.log(error)
//                   //     responseFail(error);

//                   //   });
//                 }}
//               >
//                 <span role="img">
//                   <Image src={facebook} className="image-responsive" />
//                 </span>
//                 Sign up with Facebook
//               </Button>

//               <Button
//                 role="button"
//                 className="google"
//                 onClick={() => {
//                   //   signInWithPopup(auth, provider)
//                   //     .then((result) => {
//                   //       const credential = GoogleAuthProvider.credentialFromResult(result)
//                   //       responseGoogle(credential);
//                   //     }).catch((error) => {
//                   //       console.log(error)
//                   //       responseFail(error);
//                   //     });
//                 }
//                 }
//               >
//                 <span role="img">
//                   <Image src={google} className="image-responsive" />
//                 </span>
//                 Sign in with Gmail
//               </Button>
//             </div>

//             {/* Modal */}
//             {/* <Modal
//               open={open}
//               onClose={handleClose}
//             >

//               <Box sx={style}>
//                 <Typography id="modal-modal-title" variant="h6" component="h2" style={titleFormat}>
//                   Forgot password
//                   <img style={closeButtonFormat} src={Images.cancel} alt="hell" onClick={handleClose} />
//                 </Typography>
//                 {message && (
//                   <Message variant="danger">{message}</Message>
//                 )}
//                 <Typography id="modal-modal-description" style={paragraphFormat}>
//                   Please provide your email or phone number to reset your password
//                 </Typography>

//                 <Form1>
//                   <Form1.Group className="mb-3" controlId="formBasicEmail">
//                     <Form1.Control type="email" name="email" placeholder="Enter email" style={inputTextStyle} defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
//                     <Button variant="outline-secondary" style={buttonFormat} onClick={forgetpasswordHandler}>Submit</Button>
//                   </Form1.Group>
//                 </Form1>
//               </Box>
//             </Modal> */}
//           </Form>

//           {/* <Modal
//             open={show}
//             onClose={() => setShow(false)}
//           >
//             <Box sx={style}>
//               <Typography id="modal-modal-title" variant="h6" component="h2" style={titleFormat}>
//                 Reset link has been sent
//                 <img style={closeButtonFormat} src={Images.cancel} alt="hell" onClick={handleClose} />
//               </Typography>
//               <Typography id="modal-modal-description" style={paragraphFormat}>
//                 Please click the link we have sent to your email to reset you password.
//               </Typography>
//             </Box>
//           </Modal> */}
//         </div>
//       )}
//     </Formik>

//   );
// };
// export default LoginForm;
