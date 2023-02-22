(function () {
  [...document.querySelectorAll('.control')].forEach((button) => {
    button.addEventListener('click', function () {
      document.querySelector('.active-btn').classList.remove('active-btn');
      this.classList.add('active-btn');
      document.querySelector('.active').classList.remove('active');
      document.getElementById(button.dataset.id).classList.add('active');
    });
  });

  const themeBtn = document.querySelector('.theme-btn');
  const lightTheme = 'light-mode';

  const selectedTheme = localStorage.getItem('selected-theme');

  const getCurrentTheme = () => (document.body.classList.contains(lightTheme) ? 'light' : 'dark');

  
  if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was, to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'light' ? 'add' : 'remove'](lightTheme);
  }
  
  themeBtn.addEventListener('click', () => {
    console.log(getCurrentTheme() + ' selected')
    console.log(selectedTheme)
    document.body.classList.toggle(lightTheme);
    localStorage.setItem('selected-theme', getCurrentTheme())
  });

  let form = document.getElementById('contact-form');
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let subject = document.getElementById('subject');
  let message = document.querySelector('textarea');
  let submitBtn = document.getElementById('submit-btn');

  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    form.requestSubmit();
  });

  const formData = {
    name: '',
    email: email,
    subject: '',
    message: '',
  };

  const setErrorFor = (input, message) => {
    let small = document.getElementById(`${input}Error`);
    small.classList.add('smallError');
    small.innerText = message;
  };

  const setSuccessFor = (input) => {
    let small = document.getElementById(`${input}Error`);
    small.classList.remove('smallError');
    small.innerText = '';
  };

  const isEmail = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  };

  const isInputsValid = {
    name: false,
    email: false,
    subject: false,
    message: false,
  };

  const validateName = () => {
    let nameValue = name.value.trim();
    if (nameValue === '') {
      setErrorFor('name', 'Name cannot be blank');
      isInputsValid.name = false;
    } else {
      setSuccessFor('name');
      isInputsValid.name = true;
    }
  };

  const validateEmail = () => {
    let emailValue = email.value.trim();
    if (emailValue === '') {
      setErrorFor('email', 'Email cannot be blank');
      isInputsValid.email = false;
    } else if (!isEmail(emailValue)) {
      setErrorFor('email', 'Email is not valid');
      isInputsValid.email = false;
    } else {
      setSuccessFor('email');
      isInputsValid.email = true;
    }
  };

  const validateSubject = () => {
    let subjectValue = subject.value.trim();
    if (subjectValue === '') {
      setErrorFor('subject', 'Subject cannot be blank');
      isInputsValid.subject = false;
    } else {
      setSuccessFor('subject');
      isInputsValid.subject = true;
    }
  };

  const validateMessage = () => {
    let messageValue = message.value.trim();
    if (messageValue === '') {
      setErrorFor('message', 'Message cannot be blank');
      isInputsValid.message = false;
    } else {
      setSuccessFor('message');
      isInputsValid.message = true;
    }
  };

  name.addEventListener('input', validateName);

  email.addEventListener('input', validateEmail);

  subject.addEventListener('input', validateSubject);

  message.addEventListener('input', validateMessage);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateName();
    validateEmail();
    validateSubject();
    validateMessage();
    console.log(isInputsValid.name, isInputsValid.email, isInputsValid.subject, isInputsValid.message);
    if (isInputsValid.name && isInputsValid.email && isInputsValid.subject && isInputsValid.message) {
      window.location.href = `mailto:abdulmalikadebayo07@gmail.com?subject=${formData.subject}&body=Hi, my name is ${formData.name}, ${formData.message} \n
        ${formData.email} \n ${formData.name}
        `;
      //   window.location.reload();
    }
  });
})();
