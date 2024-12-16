import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import { getAbout, getSkills } from "../ORM";
import TransparentNavbar from "./TransparentNavbar";

function View() {
  const firebaseConfig = {
    apiKey: "AIzaSyCzBafJ3OEEfNtHM7kXIEpnedGlJ2bNo4I",
    authDomain: "personal-7f86b.firebaseapp.com",
    projectId: "personal-7f86b",
    storageBucket: "personal-7f86b.firebasestorage.app",
    messagingSenderId: "841997801423",
    appId: "1:841997801423:web:f849983b73acfdc6c424ba",
    measurementId: "G-7E35DS059C",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const projectsCollection = collection(db, "Projects");
  const awardsCollection = collection(db, "Awards");

  // state variables
  const [projects, setProjects] = useState(undefined);
  const [awards, setAwards] = useState(undefined);
  const [about, setAbout] = useState('');
  const [skills, setSkills] = useState([]);


  async function fetchProjects() {
    try {
      const querySnapshot = await getDocs(projectsCollection);
      const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Projects:", projects);
      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  async function fetchAwards() {
    try {
      const querySnapshot = await getDocs(awardsCollection);
      const awards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Awards:", awards);
      return awards;
    } catch (error) {
      console.error("Error fetching awards:", error);
    }
  }

  useEffect(() => {
    fetchProjects().then(data => setProjects(data));
    fetchAwards().then(data => setAwards(data));
    getAbout().then(data => setAbout(data.text));
    getSkills().then(data => setSkills(data));
  }, []);  

  return (
    <>
      <div className="header">
        <TransparentNavbar />
        <div className="inner-header flex"></div>
          <div className="inner-header-text">
            <h1>Sarah Rubenstein</h1>
            <h2>Software Engineer</h2>
          </div>
        <div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
        <div className="whiteBackground">
          <div className="content">
            <h2 style={{paddingTop: 20}}>About Me</h2>
            <p>{about}</p>
            <h2>Skills</h2>
            {
              skills.map((skill) => {
                return(
                  <img src={skill.image} alt={skill.name} title={skill.name} style={{width: 120}}/>
                )
              })
            }
            <h2>Projects</h2>
            <Container>
              <Row>
                {projects ? projects.map((project) => {
                return (<Col key={project.id} xs={12} md={6}>
                <Card style={{ width: '20rem', margin: '10px', boxShadow: '0 8px 12px rgba(0, 0, 0, 0.1)', border: 'none', borderRadius: '20px' }}>
                  <Card.Body>
                    <Card.Title>{project.name}</Card.Title>
                    <Card.Text>
                      {project.description}
                    </Card.Text>
                    <Button onClick={() => window.open(project.link, "_blank")}>
                    Go to project
                    </Button>
                  </Card.Body>
                </Card>
                </Col>);
              }) : <></>}
              </Row>
            </Container>
            <h2>Awards/Achievements</h2>
            <Container>
              <Row>
                {awards ? awards.map((award) => {
                return (<Col key={award.id} xs={12} md={12} lg={12}>
                <Card style={{ margin: '10px', boxShadow: '0 8px 12px rgba(0, 0, 0, 0.1)', border: 'none', borderRadius: '20px' }}>
                  <Card.Body>
                    <Card.Title>{award.title}</Card.Title>
                    <Card.Text>
                      {award.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
                </Col>);
              }) : <></>}
              </Row>
            </Container>
            
          </div>
          <footer style={{ backgroundColor: "#302b2d", color: "#fff", padding: "1rem 0", marginTop: 50 }}>
      <Container>
        <Row>
          <Col className="text-center">
            <p style={{ margin: "0.5rem 0" }}>© 2024 Sarah Rubenstein</p>
          </Col>
        </Row>
      </Container>
    </footer>
        </div>
      </div>
    </>
  );
}

export default View;
