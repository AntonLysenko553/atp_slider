let controlHeaders = document.querySelectorAll("h5");
let slidesContainer = document.querySelector(".right__slides-container");
let isAllowSlideChangeFlag = true;
let infoContainer = document.querySelector(".left__info-container");
let infoDivs = infoContainer.children;
let infoParagraphs = infoContainer.querySelectorAll("p:not(#not-count)");
let infoArray = [{ city: ["Rostov-on-Don", "LCD admiral"], area: "81 m2", time: "3.5 months" }, { city: ["Sochi", "Thieves"], area: "105 m2", time: "4 months" }, { city: ["Rostov-on-Don", "Patriotic"], area: "93 m2", time: "3 months" }];
let circleControlsContainer = document.querySelector(".left__slider-controls div");
let circles = circleControlsContainer.children;
let previousSlideArrow = document.querySelector(".left__slider-controls img:first-child");
let nextSlideArrow = document.querySelector(".left__slider-controls > img:last-child");
let imagesCounter = 0;
function headerStylization(counter) {
    controlHeaders[counter].classList.add("active-h5");
    controlHeaders[counter].nextElementSibling.classList.add("active-hr");
    let containerWidth = controlHeaders[counter].parentElement.offsetWidth;
    controlHeaders[counter].nextElementSibling.animate([{ width: "0px" }, { width: `${containerWidth / 4}px` }, { width: `${containerWidth / 2}px` }, { width: `${containerWidth / 4 * 3}px` }, { width: `${containerWidth}px` }], { duration: 250, fill: "forwards" });
}
function textChanging(cycleCounter) {
    infoParagraphs.forEach((infoParagraph) => {
        infoParagraph.style.opacity = "0";
    });
    setTimeout(() => {
        infoDivs[0].firstElementChild.nextElementSibling.innerText = infoArray[cycleCounter].city[0];
        infoDivs[0].lastElementChild.innerText = infoArray[cycleCounter].city[1];
        infoDivs[1].lastElementChild.innerText = infoArray[cycleCounter].area;
        infoDivs[2].lastElementChild.innerText = infoArray[cycleCounter].time;
        infoParagraphs.forEach((infoParagraph) => {
            infoParagraph.style.opacity = "1";
        });
    }, 500);
}
function circlesHeadersActions(itemsObject) {
    itemsObject.forEach((item) => {
        item.addEventListener("click", function (event) {
            if(isAllowSlideChangeFlag) {
                isAllowSlideChangeFlag = false;
                for(let i = 0; i < 3; i++) {
                    if(itemsObject[i] !== event.target) {
                        controlHeaders[i].classList.remove("active-h5");
                        controlHeaders[i].nextElementSibling.classList.remove("active-hr");
                        circles[i].src = "images/grey_circle.svg";
                    }
                    else {
                        if(event.target === controlHeaders[0] || event.target === circles[0]) {
                            imagesCounter = 0;
                        }
                        else if(event.target === controlHeaders[1] || event.target === circles[1]) {
                            imagesCounter = 1;
                        }
                        else if(event.target === controlHeaders[2] || event.target === circles[2]) {
                            imagesCounter = 2;
                        }
                        slidesContainer.style.backgroundImage = `url("images/slide${i + 1}.png")`;
                        if(event.target === controlHeaders[i]) {
                            if(!controlHeaders[i].classList.contains("active-h5") && !controlHeaders[i].nextElementSibling.classList.contains("active-hr")) {
                                headerStylization(i);
                                textChanging(i);
                            }
                            circles[i].src = "images/white_circle.svg";
                        }
                        else if(event.target === circles[i]) {
                            if(circles[i].src !== "images/white_circle.svg") {
                                circles[i].src = "images/white_circle.svg";
                                textChanging(i);
                            }
                            headerStylization(i);
                        }
                    }
                }
                setTimeout(() => {
                    isAllowSlideChangeFlag = true;
                }, 1000);
            }
        });
    });
}
function arrowsActions(arrow) {
    arrow.addEventListener("click", function () {
        if(isAllowSlideChangeFlag) {
            isAllowSlideChangeFlag = false;
            if(arrow === document.querySelector(".left__slider-controls img:first-child")) {
                imagesCounter -= 1;
                if(imagesCounter === -1) {
                    imagesCounter = 2;
                }
            }
            else if(arrow === document.querySelector(".left__slider-controls > img:last-child")) {
                imagesCounter += 1;
                if(imagesCounter === 3) {
                    imagesCounter = 0;
                }
            }
            slidesContainer.style.backgroundImage = `url("images/slide${imagesCounter + 1}.png")`;
            for(let i = 0; i < 3; i++) {
                if(i !== imagesCounter) {
                    controlHeaders[i].classList.remove("active-h5");
                    controlHeaders[i].nextElementSibling.classList.remove("active-hr");
                    circles[i].src = "images/grey_circle.svg";
                }
            }
            headerStylization(imagesCounter);
            circles[imagesCounter].src = "images/white_circle.svg";
            textChanging(imagesCounter);
            setTimeout(() => {
                isAllowSlideChangeFlag = true;
            }, 1000);
        }
    });
}
circlesHeadersActions(controlHeaders);
circlesHeadersActions(Array.from(circles));
arrowsActions(previousSlideArrow);
arrowsActions(nextSlideArrow);