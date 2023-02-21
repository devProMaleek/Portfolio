(function () {
  [...document.querySelectorAll('.control')].forEach((button) => {
    button.addEventListener('click', function () {
      document.querySelector('.active-btn').classList.remove('active-btn');
      this.classList.add('active-btn');
      document.querySelector('.active').classList.remove('active');
      document.getElementById(button.dataset.id).classList.add('active');
    });
  });
  document.querySelector('.theme-btn').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });

  let form = document.getElementById('contact-form');
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let subject = document.getElementById('subject');
  let message = document.querySelector('textarea');

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

  const validateInputs = () => {
    let nameValue = name.value.trim();
    let emailValue = email.value.trim();
    let subjectValue = subject.value.trim();
    let messageValue = message.value.trim();

    name.addEventListener('change', () => {
      if (nameValue === '') {
        setErrorFor('name', 'Name cannot be blank');
      } else {
        setSuccessFor('name');
        isInputsValid.name = true;
      }
    });

    email.addEventListener('change', () => {
      if (emailValue === '') {
        setErrorFor('email', 'Email cannot be blank');
      } else if (!isEmail(emailValue)) {
        setErrorFor('email', 'Email is not valid');
      } else {
        setSuccessFor('email');
        isInputsValid.email = true;
      }
    });

    subject.addEventListener('change', () => {
      if (subjectValue === '') {
        setErrorFor('subject', 'Subject cannot be blank');
      } else {
        setSuccessFor('subject');
        isInputsValid.subject = true;
      }
    });

    message.addEventListener('change', () => {
      if (messageValue === '') {
        setErrorFor('message', 'Message cannot be blank');
      } else {
        setSuccessFor('message');
        isInputsValid.message = true;
      }
    });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateInputs();
    console.log(isInputsValid.name, isInputsValid.email, isInputsValid.subject, isInputsValid.message);
    if (isInputsValid.name && isInputsValid.email && isInputsValid.subject && isInputsValid.message) {
      window.location.href = `mailto:abdulmalikadebayo07@gmail.com?subject=${formData.subject}&body=Hi, my name is ${formData.name}, ${formData.message} \n
        ${formData.email} \n ${formData.name}
        `;
      window.location.reload();
    }
  });
})();
