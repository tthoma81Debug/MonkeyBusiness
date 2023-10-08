import React from "react";
//import { Dropdown, DropdownToggle } from "react-bootstrap";
import { Link } from "react-router-dom";


function TempNavBar () {
    return (
        <nav>
      {/* <ul>
        <li><Link to="/page1">Page 1</Link></li>
        <li><Link to="/page2">Page 2</Link></li>
        <li><Link to="/home">Homepage</Link></li>
      </ul> */}
        {/* <Dropdown>
            <DropdownToggle variant="success" id="dropdown-basic">
                Side Navigation
            </DropdownToggle>

            <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/home"></Dropdown.Item>
                <Dropdown.Item as={Link} to="/page1">Page 1</Dropdown.Item>
                <Dropdown.Item as={Link} to="/page2">Page 2</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown> */}
        <h1>TempNav</h1>
        <Link to="/home"><button>Homepage</button></Link>
        <Link to="/Stats"><button>Stats</button></Link>
        <Link to="/Settings"><button>Settings</button></Link>
    </nav>
    ) 
}