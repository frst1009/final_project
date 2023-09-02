import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import axios from '../axios';
import Spinner from '../Components/Spinner';

const PersonalPage=()=> {
  const isAuth = useSelector(selectIsAuth);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/recipe/userRecipe`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error finding recipe!");
        setLoading(false);
      });
  }, []);
 if (loading) {
    return <Spinner loading={loading} />;
  }
  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }
 
  return (
    <div className="profpage">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row space">
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                  <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                    Edit profile
                  </MDBBtn>
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">UserName</MDBTypography>
                  {/* <MDBCardText>New York</MDBCardText> */}
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">X</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Recipes</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">Email Address</p>
                  <div className="p-4" style={{ backgroundColor: 'black' }}>
                    <MDBCardText className="font-italic mb-1">Email</MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recipes</MDBCardText>
                </div>
                <MDBRow>
  {data.map((recipe) => (
    <MDBCol key={recipe._id} className="mb-4">
        <MDBCardImage
          src={`http://localhost:3040${recipe.image}`}
          alt={`Image for ${recipe.title}`}
          className="w-100 rounded-3"
        />
        <MDBCardText className="font-italic mb-1">
       {recipe.title}
        </MDBCardText>
    </MDBCol>
  ))}
</MDBRow>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
export default PersonalPage;