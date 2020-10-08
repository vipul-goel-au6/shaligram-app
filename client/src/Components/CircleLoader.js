import React from 'react';

const CircleLoader = () => {
    const divStyles = {height: "100%", width: "100%", display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}

    return (
        <div style={divStyles}>
            <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
      </div>
      <h5>Uploading, Please Wait...</h5>
        </div>
    );
};

export default CircleLoader;