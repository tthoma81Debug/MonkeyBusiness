// import { Link, useMatch, useResolvedPath } from 'react-router-dom'
// import React from 'react'

// export default function Navbar () {
//   return (
//     <nav className="nav">
//       <Link to="/" className="site-title">
//         Site Name
//       </Link>
//       <ul>
//         <CustomLink to="/">Home</CustomLink>
//         <CustomLink to="/about">About</CustomLink>
//         <CustomLink to = "/login">Log in</CustomLink>
//         <CustomLink to = "/signup">Sign Up</CustomLink>
//         <CustomLink to = "/monkeyTech">Monkey</CustomLink>
//       </ul>
//     </nav>
//   )
// }

// // eslint-disable-next-line react/prop-types
// function CustomLink ({ to, children, ...props }) {
//   const resolvedPath = useResolvedPath(to)
//   const isActive = useMatch({ path: resolvedPath.pathname, end: true })

//   return (
//     <li className={isActive ? 'active' : ''}>
//       <Link to={to} {...props}>
//         {children}
//       </Link>
//     </li>
//   )
// }
