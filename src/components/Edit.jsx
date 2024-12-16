import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import { getAbout, getSkills, deleteProject, deleteAward, deleteSkill } from "../ORM";
import EditAboutModal from "./EditAboutModal";
import NewSkillModal from "./NewSkillModal";
import NewProjectModal from "./NewProjectModal";
import { FaPencilAlt } from 'react-icons/fa'; 
import NewAwardModal from "./NewAwardModal";

function Edit() {
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
  const [modalShow, setModalShow] = useState(false);
  const [showCreateSkill, setShowCreateSkill] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateAward, setShowCreateAward] = useState(false);

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

  function refresh(){
    fetchProjects().then(data => setProjects(data));
    fetchAwards().then(data => setAwards(data));
    getAbout().then(data => setAbout(data.text));
    getSkills().then(data => setSkills(data));
  }

  function askDeleteSkill(skill){
    const confirmed = window.confirm(`Are you sure you want to delete "${skill.name}"?`);
    if(confirmed){
      deleteSkill(skill.id).then(refresh());
    }
  }

  function askDeleteProject(project){
    const confirmed = window.confirm(`Are you sure you want to delete "${project.name}"?`);
    if(confirmed){
      deleteProject(project.id).then(refresh());
    }
  }

  function askDeleteAward(award){
    const confirmed = window.confirm(`Are you sure you want to delete "${award.name}"?`);
    if(confirmed){
      deleteAward(award.id).then(refresh());
    }
  }

  useEffect(() => {
    refresh();
  }, []);  

  return (
    <>
      <div className="header">
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
            <div style={{ display: 'inline-flex', alignItems: 'center', paddingTop: 20 }}>
              <h2>About Me</h2>
              <FaPencilAlt style={{marginLeft: 10, marginBottom: -10}} onClick={() => {setModalShow(true)}}/>
            </div>
            {/* <Button onClick={() => {setModalShow(true)}}>Edit</Button> */}
            <p>{about}</p>
              <h2>Skills</h2>
              <Button onClick={() => setShowCreateSkill(true)}>Add skill</Button>
            <br></br>
            {
              skills.map((skill) => {
                return(
                    <img src={skill.image} alt={skill.name} title={skill.name} onClick={() => askDeleteSkill(skill)} style={{width: 120}}/>
                )
              })
            }
            <h2>Projects</h2>
            <Button onClick={() => setShowCreateProject(true)}>Add Project</Button>
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
                    <Button className="btn btn-danger" style={{marginLeft: 10}} onClick={() => askDeleteProject(project)}>Delete</Button>
                  </Card.Body>
                </Card>
                </Col>);
              }) : <></>}
              </Row>
            </Container>
            <h2>Awards/Achievements</h2>
            <Button onClick={() => setShowCreateAward(true)}>Add Award</Button>
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
                    <Button className="btn btn-danger" style={{marginLeft: 10}} onClick={() => askDeleteAward(award)}>Delete</Button>
                  </Card.Body>
                </Card>
                </Col>);
              }) : <></>}
              </Row>
            </Container>
            
          </div>
          <EditAboutModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            refresh={refresh}
            />
            <NewSkillModal
            show={showCreateSkill}
            onHide={() => setShowCreateSkill(false)}
            refresh={refresh}
            />
            <NewProjectModal
            show={showCreateProject}
            onHide={() => setShowCreateProject(false)}
            refresh={refresh}
            />
            <NewAwardModal
            show={showCreateAward}
            onHide={() => setShowCreateAward(false)}
            refresh={refresh}
            />
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

export default Edit;
