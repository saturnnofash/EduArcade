import React from 'react'
import {Container} from "reactstrap";
import "./header.css";

const navLinks = [
  {
    display: "Home",
    url: "#"
  },
  {
    display: "About",
    url: "#"
  },
  {
    display: "Games",
    url: "#"
  },
  {
    display: "Subjects",
    url: "#"
  },
]

const Header = () => {

  return <header className="header">
    <Container>
      <div className ="navigation d-flex align-items-center justify-content-between">
        <div className="logo">
          <h2 className="d-flex align-items-center"><i class="ri-copilot-fill"></i> LearnHub
          </h2>
        </div>

        <div className="nav d-flex align-items-center gap-5">
          <div className="nav_menu">
            <ul className="nav_list">

              {
                //show nav_list using navLinks function created above
                navLinks.map((item,index)=>(
                  <li key= {index} className="nav_item">
                    <a href={item.url}>{item.display}</a>
                  </li>
                ))
              }
              
            </ul>
          </div>
        </div>

      </div>
    </Container>
  </header>
};

export default Header;