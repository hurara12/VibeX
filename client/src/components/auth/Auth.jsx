import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Button } from "@/shadcn-components/ui/button"
import ImageSlider from '../Slider/ImageSlider';
import { Col, Container, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import Logo from '../../assets/ImageSlider/vibex.png'
import auth_API from "../../apis/auth/auth_API"
import { useAuth } from '@/contexts/authContext/AuthContext';



function Auth() {
  const { isLoggedIn,login } = useAuth();
  const navigate=useNavigate();
  useEffect(()=>{
    if(isLoggedIn)
    {
        navigate("/dashboard");
    }
},[isLoggedIn])
  const leftColStyle = {padding: 0,margin: 0,border: 'none',};
  const onLoginSuccess = async (credentialResponse) => {
    const token=await auth_API(credentialResponse.credential);
    if(token){login(token)};
  }
  return (
    <>
      <Container fluid>
        <ToastContainer />
        <Row>
      

          {/* Right Side */}
          <Col xs={12} lg={6}>
            <div className="container text-center d-flex flex-column align-items-center justify-content-center mt-48 sm:mt-40 lg:mt-72 xl:mt-20">
              <img
                src={Logo}
                alt="VibeX - Social Suite"
                className="logo-placeholder mb-2 mr-1 xl:h-25 xl:w-40"
                width={`50%`}
                height={"50% "}
              />

              <p className={`text-6xl sm:text-9xl lg:text-8xl xl:text-5xl font-bold	font-serif  mt-1 `}>Vibe X</p>
              <p className={`text-3xl sm:text-6xl lg:text-4xl xl:text-xl font-sans ml-3 `}>University Social Suite</p>

              <p className={`text-4xl sm:text-6xl sm:ml-3 lg:text-5xl xl:text-3xl font-bold	 mt-4`}>Login or Register <br/> Student</p>
              {/* Signup with Google Button */}
              <div className='mt-4 flex items-center justify-center'>
              <GoogleLogin
                onSuccess={onLoginSuccess}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
              </div>

              <p className="text-2xl mt-3 sm:text-4xl lg:text-2xl xl:text-sm">Are You Alumnus?</p>
              <Button className="bg-zinc-950 dark:bg-white text-white mt-2 mb-10 text-xl sm:text-3xl lg:text-4xl xl:text-sm h-14 sm:h-24 xl:h-auto">Alumni Register</Button>
            </div>
            
          </Col>
          <Col lg={6} className=" d-none d-lg-block" style={leftColStyle}>
            <ImageSlider />
          </Col>

        </Row>
      </Container>
    </>
  )
}

export default Auth;

