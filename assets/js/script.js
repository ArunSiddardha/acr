// let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// let interval = null;

// document.getElementById("test").onmouseover = event => {  
//   let iteration = 0;
  
//   clearInterval(interval);
  
//   interval = setInterval(() => {
//     event.target.innerText = event.target.innerText
//       .split("")
//       .map((letter, index) => {
//         if(index < iteration) {
//           return event.target.dataset.value[index];
//         }
      
//         return letters[Math.floor(Math.random() * 26)]
//       })
//       .join("");
    
//     if(iteration >= event.target.dataset.value.length){ 
//       clearInterval(interval);
//     }
    
//     iteration += 1 / 3;
//   }, 30);
// }
var viewportHeader = document.querySelector(".viewport-header");

document.body.addEventListener("scroll", function(event) {
  var opacity = (document.body.offsetHeight - document.body.scrollTop) / document.body.offsetHeight;
  var scale = (document.body.offsetHeight - document.body.scrollTop) / document.body.offsetHeight;
  document.documentElement.style.setProperty('--headerOpacity', opacity);
  document.documentElement.style.setProperty('--headerScale', scale);
});

// Contract Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contractForm = document.getElementById('contractForm');
    
    if (contractForm) {
        contractForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            if (contractForm.checkValidity()) {
                // Show success modal
                const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                successModal.show();
            } else {
                // Show validation feedback
                contractForm.classList.add('was-validated');
            }
        });
        
        // Real-time validation
        const inputs = contractForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (input.checkValidity()) {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                } else if (input.value) {
                    input.classList.remove('is-valid');
                    input.classList.add('is-invalid');
                }
            });
            
            input.addEventListener('input', function() {
                if (input.classList.contains('is-invalid') && input.checkValidity()) {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            });
        });
        
        // Date validation
        const startDate = document.getElementById('startDate');
        const endDate = document.getElementById('endDate');
        
        if (startDate && endDate) {
            startDate.addEventListener('change', function() {
                if (endDate.value && new Date(endDate.value) < new Date(startDate.value)) {
                    endDate.setCustomValidity('End date must be after start date');
                } else {
                    endDate.setCustomValidity('');
                }
            });
            
            endDate.addEventListener('change', function() {
                if (startDate.value && new Date(endDate.value) < new Date(startDate.value)) {
                    endDate.setCustomValidity('End date must be after start date');
                } else {
                    endDate.setCustomValidity('');
                }
            });
        }
    }
});

// Reset form function
function resetForm() {
    const contractForm = document.getElementById('contractForm');
    if (contractForm) {
        contractForm.reset();
        contractForm.classList.remove('was-validated');
        
        // Remove validation classes
        const inputs = contractForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
        
        // Close modal
        const successModal = bootstrap.Modal.getInstance(document.getElementById('successModal'));
        if (successModal) {
            successModal.hide();
        }
    }
}










