import React from 'react'
import 'assets/css/Header.css'
import Dropdown from 'components/Dropdown'

export default function Header(props) {
  return (
    <div className="header-container">
        <Dropdown changeEditorLang={props.changeEditorLang} languages={props.languages} currLang={props.currLang}/>
    </div>
  )
}
