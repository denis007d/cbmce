// Dados do conteúdo programático (exemplo reduzido para brevidade, use seus dados completos)
const studyData = {
    modules: [
        {
            id: "module-1",
            title: "MÓDULO I – CONHECIMENTOS BÁSICOS",
            subjects: [
                {
                    id: "portugues",
                    title: "LÍNGUA PORTUGUESA / INTERPRETAÇÃO DE TEXTOS",
                    topics: [
                        "Compreensão e interpretação de textos",
                        "Reconhecimento de tipos e gêneros textuais",
                        "Ortografia oficial",
                        "Acentuação gráfica",
                        "Emprego das classes de palavras",
                        "Emprego/correlação de tempos e modos verbais",
                        "Emprego do sinal indicativo de crase",
                        "Sintaxe da oração e do período",
                        "Sinais de pontuação",
                        "Concordância nominal e verbal",
                        "Regência nominal e verbal",
                        "Significação das palavras",
                        "Comunicações oficiais: o padrão ofício e tipos de documentos"
                    ]
                },
                {
                    id: "matematica",
                    title: "MATEMÁTICA / RACIOCÍNIO LÓGICO",
                    topics: [
                        "Operações com números naturais, inteiros, racionais, irracionais e reais",
                        "Problemas de contagem",
                        "Sistema legal de medidas (medidas de comprimento, área, massa e volume)",
                        "Razões e proporções; divisão proporcional",
                        "Regras de três simples e composta",
                        "Porcentagens",
                        "Equações e inequações de 1º e 2º graus",
                        "Sistemas lineares",
                        "Funções do 1º e 2º grau",
                        "Gráficos",
                        "Sequências numéricas",
                        "Progressão aritmética e geométrica",
                        "Noções de probabilidade e estatística",
                        "Raciocínio lógico: raciocínio lógico envolvendo problemas aritméticos e geométricos",
                        "Compreensão e análise da lógica de uma situação",
                        "Operações com conjuntos",
                        "Geometria plana"
                    ]
                },
                {
                    id: "atualidades",
                    title: "ATUALIDADES / HISTÓRIA DO CEARÁ",
                    topics: [
                        "Fatos de interesse e/ou notoriedade internacional, nacional e estadual",
                        "O período colonial: a ocupação do território",
                        "O período imperial: o Ceará na Confederação do Equador",
                        "O Ceará e a 'República Velha': a política oligárquica",
                        "O período de 1930 a 1964: o Ceará durante o Estado-Novo",
                        "Os governos militares e o 'novo' coronelismo",
                        "A 'nova' República: os 'governos das mudanças'"
                    ]
                },
                {
                    id: "administracao",
                    title: "NOÇÕES DE ADMINISTRAÇÃO PÚBLICA / ÉTICA NO SERVIÇO PÚBLICO",
                    topics: [
                        "Características básicas das organizações formais modernas",
                        "Organização administrativa: centralização, descentralização, concentração e desconcentração",
                        "Princípios da Administração Pública",
                        "Poderes administrativos",
                        "Participação, proteção e defesa dos direitos do usuário dos serviços públicos",
                        "Relações humanas no trabalho",
                        "Ética e cidadania",
                        "Lei de Improbidade Administrativa"
                    ]
                }
            ]
        },
        {
            id: "module-2",
            title: "MÓDULO II – CONHECIMENTOS ESPECÍFICOS",
            subjects: [
                {
                    id: "legislacao",
                    title: "LEGISLAÇÃO PERTINENTE AO CBMCE",
                    topics: [
                        "Lei Estadual nº 13.407 (Código Disciplinar da PMCE e do CBMCE)",
                        "Lei Estadual nº 13.556 (Segurança Contra Incêndios)",
                        "Lei Estadual nº 13.729 (Estatuto dos Militares Estaduais do Ceará)",
                        "Lei Estadual nº 15.797 (Promoções dos militares estaduais)",
                        "Decreto Estadual nº 31.804 (Regulamento das promoções dos militares estaduais)"
                    ]
                },
                {
                    id: "direito-constitucional",
                    title: "NOÇÕES DE DIREITO CONSTITUCIONAL",
                    topics: [
                        "Direito Constitucional: natureza, conceito e objeto; fontes formais",
                        "Constituição: conceito, classificação e objeto",
                        "Poder Constituinte",
                        "Princípios fundamentais",
                        "Sujeitos dos direitos fundamentais",
                        "Classificação dos direitos fundamentais",
                        "Direitos e garantias fundamentais",
                        "Limites e restrições aos direitos fundamentais",
                        "Ações constitucionais",
                        "Poder Executivo: forma e sistema de governo",
                        "Poder Legislativo",
                        "Poder Judiciário",
                        "Funções essenciais à Justiça",
                        "Segurança Pública: conceito e órgãos"
                    ]
                },
                {
                    id: "direito-penal",
                    title: "NOÇÕES DE DIREITO PENAL MILITAR / PROCESSUAL PENAL MILITAR",
                    topics: [
                        "Aplicação da lei penal militar",
                        "Crime militar",
                        "Imputabilidade penal",
                        "Concurso de agentes",
                        "Penas: penas principais",
                        "Extinção da punibilidade",
                        "Crimes militares em tempo de paz",
                        "Aplicação da Lei Processual Penal",
                        "Polícia Judiciária Militar",
                        "Inquérito Policial Militar"
                    ]
                },
                {
                    id: "fisica",
                    title: "FÍSICA",
                    topics: [
                        "Sistema Internacional de Unidades",
                        "Mecânica",
                        "Cinemática escalar",
                        "Cinemática vetorial",
                        "Movimento circular",
                        "Leis de Newton e suas aplicações",
                        "Trabalho, potência, energia, conservação e suas transformações",
                        "Estática dos corpos rígidos",
                        "Noções de hidráulica",
                        "Estática dos fluidos",
                        "Princípios de Pascal, Arquimedes e Stevin",
                        "Termologia e termodinâmica",
                        "Escalas termométricas",
                        "Processos de transmissão de calor",
                        "Calorimetria e mudança de estado físico",
                        "Dilatação térmica dos sólidos e dos líquidos",
                        "Princípios da termodinâmica",
                        "Entropia e entalpia",
                        "Eletromagnetismo",
                        "Introdução à eletricidade",
                        "Corrente elétrica, tensão e resistência",
                        "Lei de Ohm",
                        "Efeito Joule",
                        "Propriedades elétricas e magnéticas dos materiais"
                    ]
                },
                {
                    id: "quimica",
                    title: "QUÍMICA",
                    topics: [
                        "Classificação periódica dos elementos químicos",
                        "Classificação dos elementos em metais, não metais, semimetais e gases nobres",
                        "Propriedades periódicas e aperiódicas",
                        "Noções de Radioatividade",
                        "Natureza das emissões radioativas",
                        "Fenômenos de fissão nuclear e fusão nuclear",
                        "Riscos e aplicações das reações nucleares",
                        "Ligações químicas",
                        "Ligações iônica, covalente e metálica",
                        "Ligações intra e intermoleculares",
                        "Métodos de separação de misturas",
                        "Gases ideais",
                        "Leis dos gases",
                        "Termoquímica",
                        "Reações exotérmicas e endotérmicas",
                        "Entalpia, entropia e energia livre",
                        "Espontaneidade de uma reação",
                        "Noções de Eletroquímica",
                        "Potenciais de oxidação e redução",
                        "Espontaneidade de uma reação de oxirredução",
                        "Pilhas",
                        "Eletrólise",
                        "Corrosão",
                        "Funções inorgânicas: Ácidos, Bases, Sais e Óxidos",
                        "Soluções: Unidades de concentração"
                    ]
                },
                {
                    id: "biologia",
                    title: "BIOLOGIA / PRIMEIROS SOCORROS",
                    topics: [
                        "Noções de Anatomia e Fisiologia humana",
                        "Posição anatômica",
                        "Divisões do corpo humano",
                        "Quadrantes abdominais (órgãos)",
                        "Sistema tegumentar: pele, pelos, unhas",
                        "Sistema esquelético: funções, divisão anatômica do esqueleto",
                        "Sistema Muscular: funções, tipos de músculo",
                        "Sistema respiratório: função, respiração, órgãos componentes",
                        "Sistema cardiovascular: principais funções, sangue, coração",
                        "Sistema geniturinário: funções e componentes do sistema urinário",
                        "Sistema digestório: funções e componentes",
                        "Sistema nervoso: função, divisão, meninges",
                        "Noções de Hemorragia e choque",
                        "Hemorragia: classificação clínica, classificação anatômica, técnicas utilizadas no controle das hemorragias",
                        "Estado de choque: conceito, causas, tipos de choque, sinais e sintomas gerais do choque",
                        "Trauma em extremidades: Fratura, Luxação, Entorse",
                        "Noções de Traumatismos: lesões de crânio, coluna e tórax",
                        "Fraturas de crânio abertas e fechadas",
                        "Lesões encefálicas, concussão e contusão",
                        "Sinais e sintomas do trauma cranioencefálico (TCE)",
                        "Traumatismos de face: sinais e sintomas",
                        "Traumatismos de coluna: sinais e sintomas",
                        "Traumatismos de tórax: Pneumotórax, Tórax instável, Ruptura aórtica, Hemotórax",
                        "Ferimentos penetrantes",
                        "Objetos cravados e encravados",
                        "Queimaduras: Classificação, sinais e sintomas, classificação de acordo com sua extensão, gravidade das queimaduras, queimaduras químicas, queimaduras elétricas",
                        "Parada Cardiorrespiratória: definição, tipos, sintomas",
                        "Equipamentos de proteção individual no Atendimento Pré-Hospitalar"
                    ]
                }
            ]
        }
    ]
};

// DOM Elements
let completedTopicsEl, totalTopicsEl, progressPercentageEl, progressBarEl, modulesContainerEl, searchInputEl, timerEl, startTimerBtn, pauseTimerBtn, resetTimerBtn, shortBreakBtn, longBreakBtn;
const filterTabs = [];

// State
let completedCount = 0;
let totalTopicsCount = 0;

// Timer State
let timerInterval;
let timerTotalSeconds = 25 * 60; // Default Pomodoro time
let timerCurrentSeconds = timerTotalSeconds;
let isTimerRunning = false;
const POMODORO_DURATION = 25 * 60;
const SHORT_BREAK_DURATION = 5 * 60;
const LONG_BREAK_DURATION = 15 * 60;


// ---- Initialization ----
document.addEventListener("DOMContentLoaded", () => {
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

    totalTopicsCount = countTotalTopics();
    renderModules(); 
    loadProgress();    
    updateOverallProgress(); 
    setupEventListeners();
    updateTimerDisplay(); 
});

// ---- Core Logic: Progress ----
function countTotalTopics() {
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

    studyData.modules.forEach(module => updateModuleProgressUI(module.id));
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
    // Timer progress is not saved here as it's session-based by default in this version
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
                    if(checkbox) checkbox.checked = true;
                    loadedCompletedCount++;
                } else if (checkbox && !checkbox.checked) {
                    checkbox.checked = true; 
                }
            }
        });
    }
    completedCount = loadedCompletedCount;
}

// ---- Rendering UI ----
function renderModules() {
    if (!modulesContainerEl) return;
    modulesContainerEl.innerHTML = "";

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
    filterAndRenderTopics(); // Apply initial filter/search state
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
    arrowIcon.innerHTML = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;
    
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
        listItem.dataset.topicText = topicTextContent; // Crucial para salvar/carregar

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-checkbox h-4 w-4 md:h-5 md:w-5 text-primary rounded border-gray-border focus:ring-primary mr-2 md:mr-3 cursor-pointer flex-shrink-0";
        checkbox.addEventListener('click', (event) => event.stopPropagation()); // Evita duplo disparo

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
            updateSubjectProgressUI(subjectId, moduleId, topics.length);
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

        if (checkbox.checked !== markAsDone) {
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
    completedCount += changedCount;
    updateOverallProgress();
    updateSubjectProgressUI(subjectId, moduleId, totalTopicsInSubject);
    saveProgress();
}

// ---- Event Listeners Setup ----
function setupEventListeners() {
    if(searchInputEl) searchInputEl.addEventListener("input", filterAndRenderTopics);

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

    if(startTimerBtn) startTimerBtn.addEventListener("click", () => startPomodoroTimer(POMODORO_DURATION));
    if(shortBreakBtn) shortBreakBtn.addEventListener("click", () => startPomodoroTimer(SHORT_BREAK_DURATION));
    if(longBreakBtn) longBreakBtn.addEventListener("click", () => startPomodoroTimer(LONG_BREAK_DURATION));
    if(pauseTimerBtn) pauseTimerBtn.addEventListener("click", pausePomodoroTimer);
    if(resetTimerBtn) resetTimerBtn.addEventListener("click", resetPomodoroTimer);
}

// ---- Search and Filter Logic ----
let currentFilter = "all"; // Default filter
function filterAndRenderTopics() {
    const searchTerm = searchInputEl ? searchInputEl.value.toLowerCase() : "";
    
    modulesContainerEl.querySelectorAll(".module-accordion").forEach(moduleDiv => {
        let moduleHasVisibleContent = false;
        moduleDiv.querySelectorAll(".subject-accordion").forEach(subjectDiv => {
            let subjectHasVisibleContent = false;
            subjectDiv.querySelectorAll(".topic-item").forEach(item => {
                const topicText = item.dataset.topicText.toLowerCase();
                const itemModuleId = item.dataset.moduleId;
                const isCompleted = item.classList.contains("done");
                let show = true;

                if (searchTerm && !topicText.includes(searchTerm)) show = false;
                
                if (show) {
                    if (currentFilter === "completed" && !isCompleted) show = false;
                    else if (currentFilter === "pending" && isCompleted) show = false;
                    else if (currentFilter !== "all" && currentFilter !== "completed" && currentFilter !== "pending" && currentFilter !== itemModuleId) show = false;
                }
                
                item.style.display = show ? "flex" : "none";
                if (show) subjectHasVisibleContent = true;
            });
            // subjectDiv.style.display = subjectHasVisibleContent ? "block" : "none"; // Oculta matéria se vazia
            if(subjectHasVisibleContent) moduleHasVisibleContent = true;
        });
        // moduleDiv.style.display = moduleHasVisibleContent ? "block" : "none"; // Oculta módulo se vazio
    });
}

// ---- Timer Logic (Pomodoro)----
function startPomodoroTimer(durationInSeconds) {
    if (isTimerRunning) clearInterval(timerInterval); // Limpa se já estiver rodando outro

    timerTotalSeconds = durationInSeconds;
    timerCurrentSeconds = timerTotalSeconds;
    isTimerRunning = true;
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timerCurrentSeconds--;
        updateTimerDisplay();
        if (timerCurrentSeconds <= 0) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            // alert("Tempo esgotado!"); // Adicionar notificação sonora/visual
            document.title = "Tempo Esgotado!"; // Notificação no título
            // Poderia tocar um som aqui
            if(pauseTimerBtn) pauseTimerBtn.disabled = true;
            if(startTimerBtn) startTimerBtn.disabled = false;
        }
    }, 1000);

    if(startTimerBtn) startTimerBtn.disabled = true;
    if(shortBreakBtn && longBreakBtn){ // Desabilitar outros botões de iniciar enquanto um timer roda
        shortBreakBtn.disabled = true;
        longBreakBtn.disabled = true;
    }
    if(pauseTimerBtn) pauseTimerBtn.disabled = false;
    document.title = "Foco Total!"; // Restaura título
}

function pausePomodoroTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    if(startTimerBtn) startTimerBtn.disabled = false;
     if(shortBreakBtn && longBreakBtn){
        shortBreakBtn.disabled = false;
        longBreakBtn.disabled = false;
    }
    if(pauseTimerBtn) pauseTimerBtn.disabled = true;
}

function resetPomodoroTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerCurrentSeconds = timerTotalSeconds; // Reseta para a última duração configurada ou padrão
    updateTimerDisplay();
    if(startTimerBtn) startTimerBtn.disabled = false;
    if(shortBreakBtn && longBreakBtn){
        shortBreakBtn.disabled = false;
        longBreakBtn.disabled = false;
    }
    if(pauseTimerBtn) pauseTimerBtn.disabled = true;
    document.title = "Roadmap de Estudos CBMCE"; // Restaura título original
}

function updateTimerDisplay() {
    if (!timerEl) return;
    const minutes = Math.floor(timerCurrentSeconds / 60);
    const seconds = timerCurrentSeconds % 60;
    timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    if(isTimerRunning) document.title = `${timerEl.textContent} - Foco!`;
}