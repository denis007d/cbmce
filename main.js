// DOM Elements
let completedTopicsEl, totalTopicsEl, modulesContainerEl, searchInputEl, timerEl, startTimerBtn, pauseTimerBtn, resetTimerBtn, shortBreakBtn, longBreakBtn;

// Para o novo progresso circular
let progressCircleFillEl, progressPercentageTextEl; // Substitui progressPercentageEl e progressBarEl
const filterTabs = []; // Será preenchido com os novos botões de filtro

// State
let completedCount = 0;
let totalTopicsCount = 0;
let studyData = {}; // Será preenchido ao carregar o JSON

// Timer State
let timerInterval;
let timerTotalSeconds = 25 * 60; // Default Pomodoro time
let timerCurrentSeconds = timerTotalSeconds;
let isTimerRunning = false;
const POMODORO_DURATION = 25 * 60;
const SHORT_BREAK_DURATION = 5 * 60;
const LONG_BREAK_DURATION = 15 * 60;

// --- Variáveis e Funções para o Progresso Circular ---
let radius, circumference;
function setProgressCircleValues() {
    // Esses elementos são definidos no novo HTML
    progressCircleFillEl = document.getElementById('progressCircleFill');
    progressPercentageTextEl = document.getElementById('progressPercentageText');

    if (progressCircleFillEl && progressPercentageTextEl) {
        radius = progressCircleFillEl.r.baseVal.value;
        circumference = 2 * Math.PI * radius;
        progressCircleFillEl.style.strokeDasharray = `${circumference} ${circumference}`;
        progressCircleFillEl.style.strokeDashoffset = circumference;
    } else {
        console.warn("Elementos do progresso circular não encontrados. Verifique os IDs no HTML.");
    }
}

function setProgress(percent) {
    if (!progressCircleFillEl || !progressPercentageTextEl || typeof circumference === 'undefined') {
        // console.warn("Progresso circular não inicializado corretamente.");
        // Tenta inicializar se ainda não foi
        if(!progressCircleFillEl) setProgressCircleValues();
        if (!progressCircleFillEl || !progressPercentageTextEl || typeof circumference === 'undefined') return;
    }
    const offset = circumference - (percent / 100) * circumference;
    progressCircleFillEl.style.strokeDashoffset = offset;
    progressPercentageTextEl.textContent = `${Math.round(percent)}%`;
}
// ----------------------------------------------------

// ---- Initialization ----
document.addEventListener("DOMContentLoaded", async () => {
    // Seletores DOM para o novo layout
    completedTopicsEl = document.getElementById("completedTopics");
    totalTopicsEl = document.getElementById("totalTopics");
    modulesContainerEl = document.getElementById("modulesContainer");
    searchInputEl = document.getElementById("searchInput");
    timerEl = document.getElementById("timer");
    startTimerBtn = document.getElementById("startTimer");
    pauseTimerBtn = document.getElementById("pauseTimer");
    resetTimerBtn = document.getElementById("resetTimer");
    shortBreakBtn = document.getElementById("shortBreakTimer");
    longBreakBtn = document.getElementById("longBreakTimer");

    // Inicializa os valores para o progresso circular
    setProgressCircleValues();

    // Captura os novos botões de filtro do sidebar
    document.querySelectorAll("aside .filter-tab").forEach(tab => filterTabs.push(tab));

    // Carregar os dados do JSON
    try {
        const response = await fetch('studyData.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        studyData = await response.json();

        if (Object.keys(studyData).length > 0 && studyData.modules) {
            totalTopicsCount = countTotalTopics();
            renderModules();
            loadProgress();
            updateOverallProgress(); // Isso agora chamará setProgress
            setupEventListeners();
            updateTimerDisplay();
        } else {
            throw new Error("Os dados de estudo não foram carregados corretamente ou estão vazios.");
        }

    } catch (error) {
        console.error("Falha ao carregar ou inicializar os dados de estudo:", error);
        if (modulesContainerEl) {
            modulesContainerEl.innerHTML = "<p class='text-danger-DEFAULT text-center p-4'>Erro ao carregar os dados do edital. Verifique o console.</p>";
        }
        if (startTimerBtn) startTimerBtn.disabled = true;
        if (shortBreakBtn) shortBreakBtn.disabled = true;
        if (longBreakBtn) longBreakBtn.disabled = true;
        if (searchInputEl) searchInputEl.disabled = true;
    }
});

// ---- Core Logic: Progress ----
function countTotalTopics() {
    if (!studyData || !studyData.modules) return 0;
    let count = 0;
    studyData.modules.forEach(module => {
        module.subjects.forEach(subject => {
            count += subject.topics.length;
        });
    });
    return count;
}

function updateOverallProgress() {
    // Certifique-se de que os elementos do progresso circular estão prontos
    if (!progressCircleFillEl) {
        setProgressCircleValues(); // Tenta inicializar se não estiver pronto
    }
    if (!completedTopicsEl || !totalTopicsEl || !progressPercentageTextEl) return;


    const percentage = totalTopicsCount > 0 ? Math.round((completedCount / totalTopicsCount) * 100) : 0;
    completedTopicsEl.textContent = completedCount;
    totalTopicsEl.textContent = totalTopicsCount;

    setProgress(percentage); // ATUALIZA O PROGRESSO CIRCULAR

    if (studyData && studyData.modules) {
        studyData.modules.forEach(module => updateModuleProgressUI(module.id));
    }
}

function updateModuleProgressUI(moduleId) {
    const moduleElement = modulesContainerEl.querySelector(`.module-accordion[data-module-id="${moduleId}"]`);
    if (!moduleElement) return;
    const moduleHeaderProgressEl = moduleElement.querySelector(`.module-progress-text`);
    if (!moduleHeaderProgressEl) return;

    const topicsInModule = Array.from(modulesContainerEl.querySelectorAll(`.topic-item[data-module-id="${moduleId}"]`));
    const completedInModule = topicsInModule.filter(topic => topic.classList.contains("done")).length;
    const totalInModule = topicsInModule.length;

    if (totalInModule > 0) {
        const modulePercentage = Math.round((completedInModule / totalInModule) * 100);
        moduleHeaderProgressEl.textContent = `${completedInModule}/${totalInModule} (${modulePercentage}%)`;
    } else {
        moduleHeaderProgressEl.textContent = `0/0 (0%)`;
    }
}

function saveProgress() {
    const completedTopicsData = [];
    modulesContainerEl.querySelectorAll(".topic-item.done").forEach(item => {
        completedTopicsData.push({
            moduleId: item.dataset.moduleId,
            subjectId: item.dataset.subjectId,
            topicText: item.dataset.topicText
        });
    });
    localStorage.setItem("studyProgress_CBMCE", JSON.stringify(completedTopicsData));
}

function loadProgress() {
    const savedProgress = localStorage.getItem("studyProgress_CBMCE");
    let loadedCompletedCount = 0;
    const isCurrentlyDark = document.documentElement.classList.contains('dark');

    if (savedProgress) {
        const completedTopicsData = JSON.parse(savedProgress);
        completedTopicsData.forEach(savedTopic => {
            const topicElement = modulesContainerEl.querySelector(
                `.topic-item[data-module-id="${savedTopic.moduleId}"][data-subject-id="${savedTopic.subjectId}"][data-topic-text="${CSS.escape(savedTopic.topicText)}"]`
            );
            if (topicElement) {
                const checkbox = topicElement.querySelector('input[type="checkbox"]');
                if (!topicElement.classList.contains("done")) {
                    topicElement.classList.add("done", "line-through");
                    // Aplicar a cor correta do texto tachado com base no tema
                    topicElement.classList.add(isCurrentlyDark ? "text-text-secondary-dark" : "text-text-secondary-light");
                    if (checkbox) checkbox.checked = true;
                    loadedCompletedCount++;
                } else if (checkbox && !checkbox.checked) {
                    checkbox.checked = true;
                }
            }
        });
    }
    completedCount = loadedCompletedCount;
}

// ---- Rendering UI (Adaptado para o Novo Layout e Cores Tailwind) ----
function renderModules() {
    if (!modulesContainerEl || !studyData || !studyData.modules) return;
    modulesContainerEl.innerHTML = "";

    studyData.modules.forEach(module => {
        const moduleDiv = document.createElement("div");
        moduleDiv.className = "module-accordion bg-surface-light dark:bg-surface-dark rounded-lg shadow-custom-light dark:shadow-custom-dark overflow-hidden";
        moduleDiv.dataset.moduleId = module.id;

        const headerDiv = document.createElement("div");
        headerDiv.className = "module-header flex justify-between items-center p-4 cursor-pointer hover:bg-background-light dark:hover:bg-background-dark transition";
        headerDiv.innerHTML = `
            <div>
                <h3 class="text-lg font-semibold text-primary-DEFAULT dark:text-primary-DEFAULT">${module.title}</h3>
                <span class="text-xs text-text-secondary-light dark:text-text-secondary-dark module-progress-text">0/0 (0%)</span>
            </div>
            <svg class="w-5 h-5 transform transition-transform text-text-secondary-light dark:text-text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        `;

        const contentDiv = document.createElement("div");
        contentDiv.className = "module-content hidden p-4 border-t border-border-color-light dark:border-border-color-dark space-y-4"; // bg-surface-light dark:bg-surface-dark aplicado no pai
        module.subjects.forEach(subject => contentDiv.appendChild(renderSubject(subject, module.id)));

        moduleDiv.appendChild(headerDiv);
        moduleDiv.appendChild(contentDiv);
        modulesContainerEl.appendChild(moduleDiv);

        headerDiv.addEventListener("click", () => {
            contentDiv.classList.toggle("hidden");
            headerDiv.querySelector("svg").classList.toggle("rotate-180");
        });
    });
    filterAndRenderTopics();
}

function renderSubject(subject, moduleId) {
    const subjectDiv = document.createElement("div");
    subjectDiv.className = "subject-accordion bg-background-light dark:bg-background-dark rounded-md overflow-hidden border border-border-color-light dark:border-border-color-dark";
    subjectDiv.dataset.subjectId = subject.id;
    subjectDiv.dataset.moduleId = moduleId;

    const subjectHeaderDiv = document.createElement("div");
    subjectHeaderDiv.className = "subject-header flex justify-between items-center p-3 hover:bg-border-color-light/50 dark:hover:bg-border-color-dark/50 cursor-pointer transition";

    const subjectTitleContainer = document.createElement("div");
    subjectTitleContainer.innerHTML = `<h4 class="font-medium text-text-primary-light dark:text-text-primary-dark">${subject.title}</h4>`;

    const subjectControlsContainer = document.createElement("div");
    subjectControlsContainer.className = "flex items-center gap-2";

    const subjectProgressTextEl = document.createElement("span");
    subjectProgressTextEl.className = "text-xs text-info-DEFAULT dark:text-info-DEFAULT subject-progress-text mr-2";

    const markAllBtn = document.createElement("button");
    markAllBtn.className = "mark-all-button bg-success-DEFAULT text-success-text hover:opacity-80 text-xs px-2 py-1 rounded transition";
    markAllBtn.textContent = "Todos";
    markAllBtn.title = "Marcar Todos os Tópicos";
    markAllBtn.onclick = (e) => { e.stopPropagation(); toggleAllTopicsInSection(subject.id, moduleId, true, subject.topics.length); };

    const unmarkAllBtn = document.createElement("button");
    unmarkAllBtn.className = "unmark-all-button bg-danger-DEFAULT text-danger-text hover:opacity-80 text-xs px-2 py-1 rounded transition";
    unmarkAllBtn.textContent = "Nenhum";
    unmarkAllBtn.title = "Desmarcar Todos os Tópicos";
    unmarkAllBtn.onclick = (e) => { e.stopPropagation(); toggleAllTopicsInSection(subject.id, moduleId, false, subject.topics.length); };

    const arrowIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    arrowIcon.setAttribute("class", "w-4 h-4 transform transition-transform text-text-secondary-light dark:text-text-secondary-dark ml-2");
    arrowIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>`;
    arrowIcon.setAttribute("fill", "none");
    arrowIcon.setAttribute("stroke", "currentColor");
    arrowIcon.setAttribute("viewBox", "0 0 24 24");

    subjectControlsContainer.appendChild(subjectProgressTextEl);
    subjectControlsContainer.appendChild(markAllBtn);
    subjectControlsContainer.appendChild(unmarkAllBtn);
    subjectControlsContainer.appendChild(arrowIcon);
    subjectHeaderDiv.appendChild(subjectTitleContainer);
    subjectHeaderDiv.appendChild(subjectControlsContainer);

    const subjectContentDiv = document.createElement("div");
    subjectContentDiv.className = "subject-content hidden p-3 space-y-2"; // Fundo já é o bg-background-light/dark do subjectDiv
    subjectContentDiv.appendChild(createTopicListElement(subject.topics, moduleId, subject.id));

    subjectDiv.appendChild(subjectHeaderDiv);
    subjectDiv.appendChild(subjectContentDiv);

    subjectHeaderDiv.addEventListener("click", () => {
        subjectContentDiv.classList.toggle("hidden");
        arrowIcon.classList.toggle("rotate-180");
    });

    updateSubjectProgressUI(subject.id, moduleId, subject.topics.length);
    return subjectDiv;
}

function createTopicListElement(topics, moduleId, subjectId) {
    const topicListUl = document.createElement("ul");
    topicListUl.className = "space-y-1.5";

    topics.forEach(topicTextContent => {
        const listItem = document.createElement("li");
        listItem.className = "topic-item flex items-center p-2 hover:bg-border-color-light/30 dark:hover:bg-border-color-dark/30 rounded transition group cursor-pointer";
        listItem.dataset.moduleId = moduleId;
        listItem.dataset.subjectId = subjectId;
        listItem.dataset.topicText = topicTextContent;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        // Adapte as classes do checkbox para o novo design.
        checkbox.className = "form-checkbox h-4 w-4 text-primary-DEFAULT dark:text-primary-DEFAULT rounded border-border-color-light dark:border-border-color-dark focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-DEFAULT mr-3 cursor-pointer flex-shrink-0 bg-surface-light dark:bg-surface-dark checked:bg-primary-DEFAULT dark:checked:bg-primary-DEFAULT";
        checkbox.addEventListener('click', (event) => event.stopPropagation());

        const topicTextSpan = document.createElement("span");
        topicTextSpan.className = "topic-text-content text-sm text-text-primary-light dark:text-text-primary-dark group-hover:text-primary-DEFAULT dark:group-hover:text-primary-DEFAULT flex-grow";
        topicTextSpan.textContent = topicTextContent;

        listItem.appendChild(checkbox);
        listItem.appendChild(topicTextSpan);

        listItem.addEventListener("click", () => {
            checkbox.checked = !checkbox.checked;
            const isDone = checkbox.checked;
            const previouslyDone = listItem.classList.contains("done");
            const isCurrentlyDark = document.documentElement.classList.contains('dark');

            if (isDone && !previouslyDone) {
                completedCount++;
            } else if (!isDone && previouslyDone) {
                completedCount--;
            }

            listItem.classList.toggle("done", isDone);
            listItem.classList.toggle("line-through", isDone);

            // Limpa classes de cor de texto anteriores e aplica a correta
            listItem.classList.remove("text-text-secondary-light", "text-text-secondary-dark");
            if (isDone) {
                listItem.classList.add(isCurrentlyDark ? "text-text-secondary-dark" : "text-text-secondary-light");
            }


            updateOverallProgress();
            updateSubjectProgressUI(subjectId, moduleId, topics.length);
            updateModuleProgressUI(moduleId);
            saveProgress();
        });
        topicListUl.appendChild(listItem);
    });
    return topicListUl;
}

function toggleAllTopicsInSection(subjectId, moduleId, markAsDone, totalTopicsInSubject) {
    const topicItems = modulesContainerEl.querySelectorAll(`.topic-item[data-subject-id="${subjectId}"][data-module-id="${moduleId}"]`);
    let changedCount = 0;
    const isCurrentlyDark = document.documentElement.classList.contains('dark');

    topicItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (!checkbox) return;
        const previouslyDone = item.classList.contains("done");

        if (checkbox.checked !== markAsDone) {
            checkbox.checked = markAsDone;
            item.classList.toggle("done", markAsDone);
            item.classList.toggle("line-through", markAsDone);

            // Limpa classes de cor de texto anteriores e aplica a correta
            item.classList.remove("text-text-secondary-light", "text-text-secondary-dark");
            if (markAsDone) {
                item.classList.add(isCurrentlyDark ? "text-text-secondary-dark" : "text-text-secondary-light");
            }

            if (markAsDone && !previouslyDone) {
                changedCount++;
            } else if (!markAsDone && previouslyDone) {
                changedCount--;
            }
        }
    });

    if (changedCount !== 0) {
        completedCount += changedCount;
        updateOverallProgress();
        updateSubjectProgressUI(subjectId, moduleId, totalTopicsInSubject);
        updateModuleProgressUI(moduleId);
        saveProgress();
    }
}

// ---- Event Listeners Setup ----
function setupEventListeners() {
    if (searchInputEl) searchInputEl.addEventListener("input", filterAndRenderTopics);

    // Lógica para os botões de filtro na sidebar
    // (a array `filterTabs` já foi preenchida no DOMContentLoaded)
    filterTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            filterTabs.forEach(t => {
                // Classes para estado inativo (baseado no novo HTML)
                t.classList.remove("bg-primary-DEFAULT", "text-primary-text", "dark:bg-primary-DEFAULT", "dark:text-primary-text", "font-medium");
                t.classList.add("hover:bg-primary-DEFAULT/10", "dark:hover:bg-primary-DEFAULT/20", "text-text-primary-light", "dark:text-text-primary-dark");
            });
            // Classes para estado ativo
            tab.classList.add("bg-primary-DEFAULT", "text-primary-text", "dark:bg-primary-DEFAULT", "dark:text-primary-text", "font-medium");
            tab.classList.remove("hover:bg-primary-DEFAULT/10", "dark:hover:bg-primary-DEFAULT/20", "text-text-primary-light", "dark:text-text-primary-dark");
            
            currentFilter = tab.dataset.filter;
            filterAndRenderTopics();
        });
    });
    // Ativar o primeiro filtro ("Todos") inicialmente, se houver algum
    if (filterTabs.length > 0) {
         const initialActiveTab = filterTabs.find(tab => tab.dataset.filter === "all") || filterTabs[0];
         initialActiveTab.click(); // Simula o clique para aplicar o estado inicial
    }


    if (startTimerBtn) startTimerBtn.addEventListener("click", () => startPomodoroTimer(POMODORO_DURATION));
    if (shortBreakBtn) shortBreakBtn.addEventListener("click", () => startPomodoroTimer(SHORT_BREAK_DURATION));
    if (longBreakBtn) longBreakBtn.addEventListener("click", () => startPomodoroTimer(LONG_BREAK_DURATION));
    if (pauseTimerBtn) pauseTimerBtn.addEventListener("click", pausePomodoroTimer);
    if (resetTimerBtn) resetTimerBtn.addEventListener("click", resetPomodoroTimer);
}

// ---- Search and Filter Logic (Mesma lógica, mas a UI é diferente) ----
let currentFilter = "all";
function filterAndRenderTopics() {
    if (!modulesContainerEl) return;
    const searchTerm = searchInputEl ? searchInputEl.value.toLowerCase().trim() : "";

    modulesContainerEl.querySelectorAll(".module-accordion").forEach(moduleDiv => {
        let moduleHasVisibleContent = false;
        const currentModuleIdFilter = (currentFilter !== "all" && currentFilter !== "completed" && currentFilter !== "pending") ? currentFilter : null;

        moduleDiv.querySelectorAll(".subject-accordion").forEach(subjectDiv => {
            let subjectHasVisibleContent = false;
            subjectDiv.querySelectorAll(".topic-item").forEach(item => {
                const topicText = item.dataset.topicText.toLowerCase();
                const itemModuleId = item.dataset.moduleId;
                const isCompleted = item.classList.contains("done");
                let show = true;

                if (searchTerm && !topicText.includes(searchTerm)) {
                    show = false;
                }

                if (show) {
                    if (currentFilter === "completed" && !isCompleted) {
                        show = false;
                    } else if (currentFilter === "pending" && isCompleted) {
                        show = false;
                    } else if (currentModuleIdFilter && currentModuleIdFilter !== itemModuleId) {
                        show = false;
                    }
                }

                item.style.display = show ? "flex" : "none";
                if (show) subjectHasVisibleContent = true;
            });
            subjectDiv.style.display = subjectHasVisibleContent ? "block" : "none";
            if (subjectHasVisibleContent) moduleHasVisibleContent = true;
        });
        if (currentModuleIdFilter) {
            moduleDiv.style.display = (currentModuleIdFilter === moduleDiv.dataset.moduleId && moduleHasVisibleContent) ? "block" : "none";
        } else {
            moduleDiv.style.display = moduleHasVisibleContent ? "block" : "none";
        }
    });
}

// ---- Timer Logic (Mesma lógica, UI do timer já está no HTML)----
function startPomodoroTimer(durationInSeconds) {
    if (isTimerRunning && timerInterval) clearInterval(timerInterval);
    timerTotalSeconds = durationInSeconds;
    timerCurrentSeconds = durationInSeconds;
    isTimerRunning = true;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timerCurrentSeconds--;
        updateTimerDisplay();
        if (timerCurrentSeconds <= 0) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            document.title = "Tempo Esgotado!";
            if(window.Notification && Notification.permission === "granted") {
                new Notification("Pomodoro Finalizado!", { body: "Hora de uma pausa ou de um novo ciclo!", icon: "https://www.bombeiros.ce.gov.br/wp-content/uploads/sites/27/2021/02/emblema-cbmce-2019-1.png" });
            } else if (window.Notification && Notification.permission !== "denied") {
                Notification.requestPermission().then(permission => {
                    if(permission === "granted") {
                         new Notification("Pomodoro Finalizado!", { body: "Hora de uma pausa ou de um novo ciclo!", icon: "https://www.bombeiros.ce.gov.br/wp-content/uploads/sites/27/2021/02/emblema-cbmce-2019-1.png" });
                    }
                });
            }

            if (pauseTimerBtn) pauseTimerBtn.disabled = true;
            if (startTimerBtn) startTimerBtn.disabled = false;
            if (timerTotalSeconds === POMODORO_DURATION) {
                if (shortBreakBtn) shortBreakBtn.disabled = false;
                if (longBreakBtn) longBreakBtn.disabled = false;
            } else {
                if (startTimerBtn) startTimerBtn.disabled = false;
            }
        }
    }, 1000);

    if (startTimerBtn) startTimerBtn.disabled = true;
    if (shortBreakBtn) shortBreakBtn.disabled = true;
    if (longBreakBtn) longBreakBtn.disabled = true;
    if (pauseTimerBtn) pauseTimerBtn.disabled = false;
    document.title = "Foco Total!";
}

function pausePomodoroTimer() {
    if (timerInterval) clearInterval(timerInterval);
    isTimerRunning = false;
    if (startTimerBtn) startTimerBtn.disabled = false;
    if (shortBreakBtn) shortBreakBtn.disabled = false;
    if (longBreakBtn) longBreakBtn.disabled = false;
    if (pauseTimerBtn) pauseTimerBtn.disabled = true;
    if (timerEl && timerEl.textContent !== "00:00") {
        document.title = `${timerEl.textContent} - Pausado`;
    } else {
        document.title = "Roadmap CBMCE";
    }
}

function resetPomodoroTimer() {
    if (timerInterval) clearInterval(timerInterval);
    isTimerRunning = false;
    timerCurrentSeconds = POMODORO_DURATION;
    timerTotalSeconds = POMODORO_DURATION;
    updateTimerDisplay();

    if (startTimerBtn) startTimerBtn.disabled = false;
    if (shortBreakBtn) shortBreakBtn.disabled = false;
    if (longBreakBtn) longBreakBtn.disabled = false;
    if (pauseTimerBtn) pauseTimerBtn.disabled = true;
    document.title = "Roadmap CBMCE";
}

function updateTimerDisplay() {
    if (!timerEl) return;
    const minutes = Math.floor(timerCurrentSeconds / 60);
    const seconds = timerCurrentSeconds % 60;
    const displayTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timerEl.textContent = displayTime;
    if (isTimerRunning) {
        document.title = `${displayTime} - Foco!`;
    }
}
