insertContent('home')
function insertContent(id, payload) {
    const placeholder = document.getElementById('content-placeholder');
    if (placeholder) {
        switch (id) {
            case 'home':
                placeholder.innerHTML = `
                <section class="home align-all-center">
                    <div class="align-all-center column">
                        <h1 class="large-title">LUU</h1>
                        <p>FIND YOUR PERFECT MATCH</p>
                    </div>
                    <button onclick="insertContent('loading')" class="lighting-circle-button">SCAN</button>
                    <img alt="LUU LOGO" src="./imgs/luu-indigo.png" />
                </section>
                `;
                break;
            case 'loading':
                placeholder.innerHTML = `
                <section class="loading align-all-center">
                        <div class="loading-container">
                        <div class="loading-particle"></div>
                        <div class="loading-particle"></div>
                        <div class="loading-particle"></div>
                        <div class="loading-particle"></div>
                        <div class="loading-particle"></div>
                        <div class="loading-particle"></div>
                        <div class="loading-particle"></div>
                        <div class="loading-particle"></div>
                    </div>
                    <img alt="LUU LOGO" src="./imgs/luu-indigo.png" />
                </section>
                `;
                setTimeout(() => {
                    fetch("https://randomuser.me/api/?gender=female&results=10").then(raw => raw.json()).then((res) => {
                        insertContent('display-users', { users: res.results })
                    })
                }, 2000)

                break;
            case 'display-users':
                const users = payload?.users ?? [];
                placeholder.innerHTML = `
                <section class="display-users">
                    <div class="curtain">
                        ${[...users].map((e, i) => {
                    return `<div class="single-user" style="top: ${5 + (e.dob.age / 2.5) + i}rem; ${i % 2 ? 'left' : 'right'}: ${3 + i + (i + 2)}rem; margin-top: ${i + 1}px;">
                            <img
                            src="${e.picture.large}"
                            alt="LUU-user"
                            />
                            <p>${e.name.first} ${e.name.last}</p>
                        </div>`.replaceAll(",", "")
                })}
                        <div onclick="displayDialog(1)" class="single-user" style="top:10rem; left: 4rem;">
                            <img
                            src="../imgs/lydie.JPG"
                            alt="LUU-user"
                            />
                            <p>Lydiane Santana</p>
                        </div>
                        <div id="dialog-holder"></div>
                    </div>
                </section>
              `;
                break;
            case 'chat':
                placeholder.innerHTML = `
                    <section id="chat">
                        <div class="appbar">
                            <i class="fa fa-chevron-left"></i>
                            <img src="../imgs/lydie.JPG"/>
                            <div>
                                <p class="p-medium bold">Lydiane Santana</p>
                                <p class="primary-color">• Online</p>
                            </div>
                            <div class="actions">
                                <i class="fa fa-video"></i>
                                <i class="fa fa-phone"></i>
                            </div>
                        </div>
                        <div class="body">
                            <div class="no-message">
                            <p class="bold">No message here yet...</p>
                            <p>Send a message or tap the greeting bellow</p>
                            <img id="gif" src="https://i.pinimg.com/originals/24/c3/67/24c36745086e8b943fbeb94e32e356c4.gif" alt="LUU"/>
                            </div>
                        </div>
                        <div class="bottombar">
                            <i class="fa fa-plus"></i>
                            <div class="input-with-icon">
                                <input type="text" placeholder="Type here">
                                <i class="fa fa-microphone"></i>
                          </div>
                        </div>
                    </section>
                `;
                break;
            default:
                placeholder.innerHTML = ""
                break;
        }
    }
}


function displayDialog(state) {
    document.getElementById("dialog-holder").innerHTML = !state ? '' : `
    <div class="start-conversation">
        <div class="alert-dialog">
            <img alt="LUU-lucem" src="../imgs/lydie.JPG"/>
            <div class="column align-all-center">
                <h1>Lydiane Santana</h1>
                <p>28 years ■ Female</p>
            </div>
            <div class="actions">
                <button onclick="insertContent('chat')">Say Hi</button>
                <button class="disabled" onclick="displayDialog(0)">Close</button>
            </div>
        </div>
    </div>
    `
}