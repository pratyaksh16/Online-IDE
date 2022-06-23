import React from 'react'
import 'assets/css/Header.css'
import Dropdown from 'components/Dropdown'
export default function Header(props) {
  return (
    <div className="header-container">
      <div className="header-sub-container">
        <div className="codeg-logo"><img src="/icons/CodeG-Logo.png" alt="CodeG Logo" /></div>
        <div className="header-content">
          <Dropdown changeEditorLang={props.changeEditorLang} languages={props.languages} currLang={props.currLang}/>
        </div>
      </div>
    </div>
  )
}
