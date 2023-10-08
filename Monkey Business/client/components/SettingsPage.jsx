import React from 'react';

function SettingsPage() {
  return (
    <div>
      <div>
        <h1>Settings Page</h1>
        <h2>This is where the settings will be</h2>
      </div>
      <div>
        <p>
          Theme mode:
          <label>
            <input type='radio' name='settingsRadio' value='option1'/>
            Light Mode
          </label>
          <label>
            <input type='radio' name='settingsRadio' value='option2'/>
            Dark Mode
          </label>
        </p>
      </div>
      
    </div>
  )

}

export default SettingsPage;