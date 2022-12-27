import React from "react";

function openIframeInIncognito(iframe) {
    const incognitoWindow = window.open('', '_blank', 'incognito=yes');
    if (!incognitoWindow) {
      // The window couldn't be opened in incognito mode.
      // Fall back to opening in a regular window.
      window.open('', '_blank');
    }
    incognitoWindow.document.write(iframe.outerHTML);
  }

export default function CollabEditor(){
    return(
        <div>
            <h3>collab Editor</h3>
            openIframeInIncognito(<iframe src="https://3000-vignancse-collaborative-gnus8d2vuuh.ws-us80.gitpod.io" 
                style={{width:'1360px',height:'550px'}} scrolling='no' >
            </iframe>)
        </div>
    )
}