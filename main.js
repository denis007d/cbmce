// DOM Elements
let completedTopicsEl, totalTopicsEl, progressPercentageEl, progressBarEl, modulesContainerEl, searchInputEl, timerEl, startTimerBtn, pauseTimerBtn, resetTimerBtn, shortBreakBtn, longBreakBtn;
const filterTabs = [];

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


// ---- Initialization ----
document.addEventListener("DOMContentLoaded", async () => {
    completedTopicsEl = document.getElementById("completedTopics");
    totalTopicsEl = document.getElementById("totalTopics");
    progressPercentageEl = document.getElementById("progressPercentage");
    progressBarEl = document.getElementById("progressBar");
    modulesContainerEl = document.getElementById("modulesContainer");
    searchInputEl = document.getElementById("searchInput");
    timerEl = document.getElementById("timer");
    startTimerBtn = document.getElementById("startTimer");
    pauseTimerBtn = document.getElementById("pauseTimer");
    resetTimerBtn = document.getElementById("resetTimer");
    shortBreakBtn = document.getElementById("shortBreakTimer");
    longBreakBtn = document.getElementById("longBreakTimer");

    document.querySelectorAll(".filter-tab").forEach(tab => filterTabs.push(tab));

    // Carregar os dados do JSON
    try {
        const response = await fetch('studyData.json'); // Certifique-se que o caminho está correto
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        studyData = await response.json();

        // O restante da inicialização que depende de studyData
        if (Object.keys(studyData).length > 0 && studyData.modules) { // Verifica se studyData foi carregado
            totalTopicsCount = countTotalTopics();
            renderModules();
            loadProgress(); // Carrega o progresso DEPOIS que os módulos são renderizados
            updateOverallProgress(); // Atualiza a UI com base no progresso carregado
            setupEventListeners();
            updateTimerDisplay();
        } else {
            throw new Error("Os dados de estudo não foram carregados corretamente ou estão vazios.");
        }

    } catch (error) {
        console.error("Falha ao carregar ou inicializar os dados de estudo:", error);
        if (modulesContainerEl) {
            modulesContainerEl.innerHTML = "<p class='text-red-500 text-center p-4'>Erro ao carregar os dados do edital. Verifique o console para mais detalhes e tente recarregar a página.</p>";
        }
        // Desabilitar funcionalidades que dependem dos dados
        if (startTimerBtn) startTimerBtn.disabled = true;
        if (shortBreakBtn) shortBreakBtn.disabled = true;
        if (longBreakBtn) longBreakBtn.disabled = true;
        if (searchInputEl) searchInputEl.disabled = true;
    }
});

// ---- Core Logic: Progress ----
function countTotalTopics() {
    if (!studyData || !studyData.modules) return 0; // Proteção
    let count = 0;
    studyData.modules.forEach(module => {
        module.subjects.forEach(subject => {
            count += subject.topics.length;
        });
    });
    return count;
}

function updateOverallProgress() {
    if (!completedTopicsEl || !totalTopicsEl || !progressPercentageEl || !progressBarEl) return;

    const percentage = totalTopicsCount > 0 ? Math.round((completedCount / totalTopicsCount) * 100) : 0;
    completedTopicsEl.textContent = completedCount;
    totalTopicsEl.textContent = totalTopicsCount;
    progressPercentageEl.textContent = `${percentage}%`;
    progressBarEl.style.width = `${percentage}%`;

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

    if (savedProgress) {
        const completedTopicsData = JSON.parse(savedProgress);
        completedTopicsData.forEach(savedTopic => {
            const topicElement = modulesContainerEl.querySelector(
                `.topic-item[data-module-id="${savedTopic.moduleId}"][data-subject-id="${savedTopic.subjectId}"][data-topic-text="${CSS.escape(savedTopic.topicText)}"]`
            );
            if (topicElement) {
                const checkbox = topicElement.querySelector('input[type="checkbox"]');
                if (!topicElement.classList.contains("done")) {
                    topicElement.classList.add("done", "text-gray-text", "line-through");
                    if (checkbox) checkbox.checked = true;
                    loadedCompletedCount++;
                } else if (checkbox && !checkbox.checked) {
                    // Garante que o checkbox reflita o estado 'done' se houver alguma inconsistência (improvável aqui)
                    checkbox.checked = true;
                }
            }
        });
    }
    completedCount = loadedCompletedCount;
    // A atualização da UI (updateOverallProgress) será chamada após loadProgress na inicialização.
}

// ---- Rendering UI ----
function renderModules() {
    if (!modulesContainerEl || !studyData || !studyData.modules) return;
    modulesContainerEl.innerHTML = ""; // Limpa antes de renderizar

    studyData.modules.forEach(module => {
        const moduleDiv = document.createElement("div");
        moduleDiv.className = "module-accordion bg-card-bg rounded-lg shadow-md mb-4";
        moduleDiv.dataset.moduleId = module.id;

        const headerDiv = document.createElement("div");
        headerDiv.className = "module-header flex justify-between items-center p-3 md:p-4 cursor-pointer border-b border-gray-border hover:bg-gray-hover transition";
        headerDiv.innerHTML = `
            <div>
                <h3 class="text-md md:text-lg font-semibold text-primary">${module.title}</h3>
                <span class="text-xs text-gray-text module-progress-text">0/0 (0%)</span>
            </div>
            <svg class="w-5 h-5 transform transition-transform text-gray-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        `;

        const contentDiv = document.createElement("div");
        contentDiv.className = "module-content hidden p-3 md:p-4 space-y-3 md:space-y-4";
        module.subjects.forEach(subject => contentDiv.appendChild(renderSubject(subject, module.id)));

        moduleDiv.appendChild(headerDiv);
        moduleDiv.appendChild(contentDiv);
        modulesContainerEl.appendChild(moduleDiv);

        headerDiv.addEventListener("click", () => {
            contentDiv.classList.toggle("hidden");
            headerDiv.querySelector("svg").classList.toggle("rotate-180");
        });
    });
    filterAndRenderTopics(); // Apply initial filter/search state after rendering
}

function renderSubject(subject, moduleId) {
    const subjectDiv = document.createElement("div");
    subjectDiv.className = "subject-accordion border border-gray-border rounded-md overflow-hidden";
    subjectDiv.dataset.subjectId = subject.id;
    subjectDiv.dataset.moduleId = moduleId;

    const subjectHeaderDiv = document.createElement("div");
    subjectHeaderDiv.className = "subject-header flex justify-between items-center p-2.5 md:p-3 bg-light hover:bg-gray-hover cursor-pointer transition";

    const subjectTitleContainer = document.createElement("div");
    subjectTitleContainer.innerHTML = `<h4 class="font-medium text-sm md:text-base text-dark">${subject.title}</h4>`;

    const subjectControlsContainer = document.createElement("div");
    subjectControlsContainer.className = "flex items-center gap-1.5 md:gap-2";

    const subjectProgressTextEl = document.createElement("span");
    subjectProgressTextEl.className = "text-xs text-info subject-progress-text";

    const markAllBtn = document.createElement("button");
    markAllBtn.className = "mark-all-button bg-success hover:opacity-80 text-white text-xs px-1.5 py-0.5 rounded transition";
    markAllBtn.textContent = "Marcar";
    markAllBtn.title = "Marcar Todos os Tópicos";
    markAllBtn.onclick = (e) => { e.stopPropagation(); toggleAllTopicsInSection(subject.id, moduleId, true, subject.topics.length); };

    const unmarkAllBtn = document.createElement("button");
    unmarkAllBtn.className = "unmark-all-button bg-danger hover:opacity-80 text-white text-xs px-1.5 py-0.5 rounded transition";
    unmarkAllBtn.textContent = "Desm.";
    unmarkAllBtn.title = "Desmarcar Todos os Tópicos";
    unmarkAllBtn.onclick = (e) => { e.stopPropagation(); toggleAllTopicsInSection(subject.id, moduleId, false, subject.topics.length); };

    const arrowIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    arrowIcon.setAttribute("class", "w-4 h-4 md:w-5 md:h-5 transform transition-transform text-gray-text");
    // Corrigido para usar innerHTML em um elemento SVG existente
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
    subjectContentDiv.className = "subject-content hidden p-2.5 md:p-3 bg-card-bg";
    subjectContentDiv.appendChild(createTopicListElement(subject.topics, moduleId, subject.id));

    subjectDiv.appendChild(subjectHeaderDiv);
    subjectDiv.appendChild(subjectContentDiv);

    subjectHeaderDiv.addEventListener("click", () => {
        subjectContentDiv.classList.toggle("hidden");
        //  A rotação do ícone da seta já é feita no SVG via CSS ou na classe 'rotate-180'
        //  No seu código original, você faz headerDiv.querySelector("svg").classList.toggle("rotate-180");
        //  Para o ícone da matéria, seria arrowIcon.classList.toggle("rotate-180");
        arrowIcon.classList.toggle("rotate-180");
    });

    updateSubjectProgressUI(subject.id, moduleId, subject.topics.length);
    return subjectDiv;
}

function createTopicListElement(topics, moduleId, subjectId) {
    const topicListUl = document.createElement("ul");
    topicListUl.className = "space-y-1.5 md:space-y-2";

    topics.forEach(topicTextContent => {
        const listItem = document.createElement("li");
        listItem.className = "topic-item flex items-center p-1.5 md:p-2 hover:bg-gray-hover rounded transition group cursor-pointer";
        listItem.dataset.moduleId = moduleId;
        listItem.dataset.subjectId = subjectId;
        listItem.dataset.topicText = topicTextContent;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-checkbox h-4 w-4 md:h-5 md:w-5 text-primary rounded border-gray-border focus:ring-primary mr-2 md:mr-3 cursor-pointer flex-shrink-0";
        checkbox.addEventListener('click', (event) => event.stopPropagation());

        const topicTextSpan = document.createElement("span");
        topicTextSpan.className = "topic-text-content text-xs md:text-sm text-dark group-hover:text-primary flex-grow";
        topicTextSpan.textContent = topicTextContent;

        listItem.appendChild(checkbox);
        listItem.appendChild(topicTextSpan);

        listItem.addEventListener("click", () => {
            checkbox.checked = !checkbox.checked;
            const isDone = checkbox.checked;
            const previouslyDone = listItem.classList.contains("done");

            if (isDone && !previouslyDone) {
                completedCount++;
            } else if (!isDone && previouslyDone) {
                completedCount--;
            }

            listItem.classList.toggle("done", isDone);
            listItem.classList.toggle("text-gray-text", isDone);
            listItem.classList.toggle("line-through", isDone);

            updateOverallProgress();
            updateSubjectProgressUI(subjectId, moduleId, topics.length); // Passa o total de tópicos da matéria
            updateModuleProgressUI(moduleId); // Atualiza o progresso do módulo pai também
            saveProgress();
        });
        topicListUl.appendChild(listItem);
    });
    return topicListUl;
}

function updateSubjectProgressUI(subjectId, moduleId, totalTopicsInSubject) {
    const subjectElement = modulesContainerEl.querySelector(`.subject-accordion[data-subject-id="${subjectId}"][data-module-id="${moduleId}"]`);
    if (!subjectElement) return;
    const subjectProgressTextEl = subjectElement.querySelector('.subject-progress-text');
    if (!subjectProgressTextEl) return;

    const completedInSubject = Array.from(subjectElement.querySelectorAll(`.topic-item.done`)).length;
    subjectProgressTextEl.textContent = `${completedInSubject}/${totalTopicsInSubject}`;
}


function toggleAllTopicsInSection(subjectId, moduleId, markAsDone, totalTopicsInSubject) {
    const topicItems = modulesContainerEl.querySelectorAll(`.topic-item[data-subject-id="${subjectId}"][data-module-id="${moduleId}"]`);
    let changedCount = 0;

    topicItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (!checkbox) return;
        const previouslyDone = item.classList.contains("done");

        if (checkbox.checked !== markAsDone) { // Processa apenas se o estado for diferente
            checkbox.checked = markAsDone;
            item.classList.toggle("done", markAsDone);
            item.classList.toggle("text-gray-text", markAsDone);
            item.classList.toggle("line-through", markAsDone);

            if (markAsDone && !previouslyDone) {
                changedCount++;
            } else if (!markAsDone && previouslyDone) {
                changedCount--;
            }
        }
    });

    if (changedCount !== 0) { // Só atualiza se houver mudança
        completedCount += changedCount;
        updateOverallProgress();
        updateSubjectProgressUI(subjectId, moduleId, totalTopicsInSubject);
        updateModuleProgressUI(moduleId); // Atualiza o progresso do módulo pai
        saveProgress();
    }
}

// ---- Event Listeners Setup ----
function setupEventListeners() {
    if (searchInputEl) searchInputEl.addEventListener("input", filterAndRenderTopics);

    filterTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            filterTabs.forEach(t => {
                t.classList.remove("bg-primary", "text-white");
                t.classList.add("bg-gray-border", "hover:bg-gray-hover", "text-dark");
            });
            tab.classList.add("bg-primary", "text-white");
            tab.classList.remove("bg-gray-border", "hover:bg-gray-hover", "text-dark");
            currentFilter = tab.dataset.filter;
            filterAndRenderTopics();
        });
    });

    if (startTimerBtn) startTimerBtn.addEventListener("click", () => startPomodoroTimer(POMODORO_DURATION));
    if (shortBreakBtn) shortBreakBtn.addEventListener("click", () => startPomodoroTimer(SHORT_BREAK_DURATION));
    if (longBreakBtn) longBreakBtn.addEventListener("click", () => startPomodoroTimer(LONG_BREAK_DURATION));
    if (pauseTimerBtn) pauseTimerBtn.addEventListener("click", pausePomodoroTimer);
    if (resetTimerBtn) resetTimerBtn.addEventListener("click", resetPomodoroTimer);
}

// ---- Search and Filter Logic ----
let currentFilter = "all"; // Default filter
function filterAndRenderTopics() {
    if (!modulesContainerEl) return; // Adicionado para segurança
    const searchTerm = searchInputEl ? searchInputEl.value.toLowerCase() : "";

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

                // Filtragem por termo de busca
                if (searchTerm && !topicText.includes(searchTerm)) {
                    show = false;
                }

                // Filtragem por status (todos, completo, pendente) ou por módulo específico
                if (show) { // Só aplica outros filtros se já não foi escondido pela busca
                    if (currentFilter === "completed" && !isCompleted) {
                        show = false;
                    } else if (currentFilter === "pending" && isCompleted) {
                        show = false;
                    } else if (currentModuleIdFilter && currentModuleIdFilter !== itemModuleId) {
                        // Se um filtro de módulo está ativo e não é este módulo, esconde
                        show = false;
                    }
                }

                item.style.display = show ? "flex" : "none";
                if (show) subjectHasVisibleContent = true;
            });

            // Mostra/esconde a matéria dependendo se tem tópicos visíveis
            subjectDiv.style.display = subjectHasVisibleContent ? "block" : "none";
            if (subjectHasVisibleContent) moduleHasVisibleContent = true;
        });

        // Mostra/esconde o módulo dependendo se tem matérias visíveis ou se o filtro é para este módulo
        if (currentModuleIdFilter) { // Se filtrando por um módulo específico
            moduleDiv.style.display = (currentModuleIdFilter === moduleDiv.dataset.moduleId && moduleHasVisibleContent) ? "block" : "none";
        } else { // Se não está filtrando por módulo específico (all, completed, pending)
            moduleDiv.style.display = moduleHasVisibleContent ? "block" : "none";
        }
    });
}


// ---- Timer Logic (Pomodoro)----
function startPomodoroTimer(durationInSeconds) {
    if (isTimerRunning && timerInterval) clearInterval(timerInterval);

    timerTotalSeconds = durationInSeconds; // Salva a duração para o reset
    timerCurrentSeconds = durationInSeconds; // Inicia com a duração passada
    isTimerRunning = true;
    updateTimerDisplay(); // Atualiza imediatamente

    timerInterval = setInterval(() => {
        timerCurrentSeconds--;
        updateTimerDisplay();
        if (timerCurrentSeconds <= 0) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            document.title = "Tempo Esgotado!";
            // alert("Tempo esgotado!"); // Considerar alternativa menos intrusiva
            // Tocar um som de notificação (requer arquivo de áudio e permissão)
            // new Audio('notification.mp3').play().catch(e => console.warn("Não foi possível tocar o som:", e));
            if (pauseTimerBtn) pauseTimerBtn.disabled = true;
            if (startTimerBtn) startTimerBtn.disabled = false;
            // Reabilitar botões de break apenas se não for um break que acabou
            if (timerTotalSeconds === POMODORO_DURATION) { // Se era um pomodoro que acabou
                if(shortBreakBtn) shortBreakBtn.disabled = false;
                if(longBreakBtn) longBreakBtn.disabled = false;
            } else { // Se era um break que acabou
                 if(startTimerBtn) startTimerBtn.disabled = false; // Reabilita o Pomodoro principal
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
    if (timerEl.textContent !== "00:00") { // Se não esgotou, mantém o título com o tempo
         document.title = `${timerEl.textContent} - Pausado`;
    } else {
        document.title = "Roadmap de Estudos CBMCE"; // Ou o título original
    }
}

function resetPomodoroTimer() {
    if (timerInterval) clearInterval(timerInterval);
    isTimerRunning = false;
    // Ao resetar, idealmente volta para a duração do Pomodoro principal,
    // ou a última duração configurada se isso for desejado.
    // Para simplificar, vamos resetar para o POMODORO_DURATION
    timerCurrentSeconds = POMODORO_DURATION;
    timerTotalSeconds = POMODORO_DURATION; // Atualiza a base para o próximo start/reset
    updateTimerDisplay();

    if (startTimerBtn) startTimerBtn.disabled = false;
    if (shortBreakBtn) shortBreakBtn.disabled = false;
    if (longBreakBtn) longBreakBtn.disabled = false;
    if (pauseTimerBtn) pauseTimerBtn.disabled = true;
    document.title = "Roadmap de Estudos CBMCE"; // Título original
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
    // Se não estiver rodando e não estiver em 00:00, pode indicar que está pausado no título
    // Isso já é tratado em pausePomodoroTimer e resetPomodoroTimer.
}