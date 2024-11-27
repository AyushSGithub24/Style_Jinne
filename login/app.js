let signUpBtn=document.querySelector('.signUpBtn');
let signInBtn=document.querySelector('.signInBtn')
let nameField=document.querySelector('.namefield')
let title=document.querySelector('.title');
let underline=document.querySelector('.underline')
let text=document.querySelector('.text');

signInBtn.addEventListener('click',()=>{
    nameField.style.display="none";
    title.textContent='Sign In';
    text.textContent='Forget Password'
    signUpBtn.classList.add("disable");
    signInBtn.classList.remove('disable');
    underline.style.transform='translateX(35px)';
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    setTimeout( signIn(email, password),1000)
   
  
    
})
signUpBtn.addEventListener('click',()=>{
    nameField.style.maxHeight='60px';
    title.textContent='Sign Up';
    text.textContent='Password Suggestion'
    signInBtn.classList.add("disable");
    signUpBtn.classList.remove('disable');
    underline.style.transform='translateX(0px)';
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    signUp(name, email, password);
   
})
async function signUp(name, email, password) {
    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Signed up successfully!');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function signIn(email, password) {
    try {
      const response = await fetch('http://localhost:3000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Signed in successfully!');
        window.location.href="../index.html";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }