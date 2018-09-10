import React, { Component } from 'react';
import '../../App.css';

class TagVerifier extends Component {
  
  checkTag(input) {
    const openBracket = '<';
    const closeTagMarker = '/';
    const endBracket = '>';
    const noMatchTag = '#';
    const successMsg = "Correctly tagged paragraph";
    const tagList = [];
    const tagStatus = {
      none: 'none',
      openTag: 'openTag',
      closeTag: 'closeTag',
    };
    let msg = "";
    let status = tagStatus.none;
    let currentTag = '';
    
    for(let i = 0; i < input.length; i++) {
      let currentChar = input.charAt(i);
      switch(status) {
        case "none":
          if(currentChar === openBracket) {
            status = tagStatus.openTag;
          }
          break;
        case "openTag":
          if(currentChar === closeTagMarker) {
            status = tagStatus.closeTag;
          } else if (currentChar === endBracket) {
            if (currentTag !== ''){
              tagList.push(currentTag);
            }
            currentTag = '';
            status = tagStatus.none;
          } else {
            if (currentTag === '' && currentChar.toUpperCase()){
              currentTag = currentChar;
            } else {
              currentTag = '';
              status = tagStatus.none;
            }
          }
          break;
        case "closeTag":
          if (currentChar === endBracket) {
            if (tagList.length !== 0) {
              let popTag = tagList.pop();
              if (popTag !== currentTag) {
                msg = this.formErrorMessage(popTag, currentTag);
              } else {
                currentTag = '';
                status = tagStatus.none;
              }
            } else {
              msg = this.formErrorMessage(noMatchTag, currentTag);
            }
          } else {
            if (currentTag === '' && currentChar.toUpperCase()){
              currentTag = currentChar;
            } else {
              currentTag = '';
              status = tagStatus.none;
            }
          }
          break;
        default:
          currentTag = '';
          status = tagStatus.none;
      }
      
    }
    
    if (msg !== "") {
      if (tagList.length !== 0) {
        tagList.forEach((item) => {
          msg = this.formErrorMessage(item, noMatchTag);
          return msg
        })
      }
    } else {
      msg = successMsg;
    }
    return msg;
  }
  
  formErrorMessage(expectedTag, unexpectedTag) {
    const noMatchTag = '#';
    let expectedTagFormat;
    let unexpectedTagFormat;
    
    if(expectedTag !== noMatchTag) {
      expectedTagFormat = `</${expectedTag}>`;
    } else {
      expectedTagFormat = noMatchTag;
    }
    
    if(unexpectedTag !== noMatchTag){
      unexpectedTagFormat = `</${unexpectedTag}>`;
    } else {
      unexpectedTagFormat = noMatchTag;
    }
  
    const msgToShow = `Expected ${expectedTagFormat} found ${unexpectedTagFormat}`
    console.log('msgToShow: ', msgToShow)
    console.log('-----------------------------')
    
    return msgToShow;
  }
  
  render() {
    const { tag } = this.props;
    
    return (
      <div className="App">
        <p className="App-title">{this.checkTag(tag)}</p>
      </div>
    );
  }
}

export default TagVerifier;
