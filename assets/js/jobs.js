let container = document.getElementById('jobs');
let jobs = JSON.parse(container.dataset.jobs);


for(let i in jobs) {
    let job = jobs[i];
    
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate()+Math.floor(Math.random() * 2);

    let date = `${day}/${month}/${year}`;

    let html = `
        <div class="card mb-3 job">
            <div class="card-body">
                <h5 class="card-title">${job.job_title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${job.company_name}</h6>
                <p class="card-text">${date}</p>
                <a href="${job.url}" class="card-link">View <i class="fa-solid fa-link"></i> </a>
            </div>
        </div>
    `;

    container.innerHTML += html;
}