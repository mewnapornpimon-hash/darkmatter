function getBag() {
    const bag = localStorage.getItem("darkmatterBag");
    return bag ? JSON.parse(bag) : [];
}

function saveBag(bag) {
    localStorage.setItem("darkmatterBag", JSON.stringify(bag));
}

function updateBagCount() {
    const bag = getBag();
    const totalQty = bag.reduce((sum, item) => sum + Number(item.quantity || 1), 0);

    const countEls = document.querySelectorAll("#bagCount");
    countEls.forEach((el) => {
        el.textContent = `BAG [ ${totalQty} ]`;
    });
}

function addToBag(item) {
    const bag = getBag();

    const existingIndex = bag.findIndex(
        (bagItem) =>
            bagItem.id === item.id &&
            String(bagItem.size || "") === String(item.size || "")
    );

    if (existingIndex > -1) {
        bag[existingIndex].quantity = Number(bag[existingIndex].quantity || 1) + 1;
    } else {
        bag.push({
            ...item,
            quantity: 1
        });
    }

    saveBag(bag);
    updateBagCount();
}

function removeFromBag(index) {
    const bag = getBag();
    bag.splice(index, 1);
    saveBag(bag);
    updateBagCount();
}

function increaseBagItemQuantity(index) {
    const bag = getBag();
    if (!bag[index]) return;
    bag[index].quantity = Number(bag[index].quantity || 1) + 1;
    saveBag(bag);
    updateBagCount();
}

function decreaseBagItemQuantity(index) {
    const bag = getBag();
    if (!bag[index]) return;

    const currentQty = Number(bag[index].quantity || 1);

    if (currentQty > 1) {
        bag[index].quantity = currentQty - 1;
    } else {
        bag.splice(index, 1);
    }

    saveBag(bag);
    updateBagCount();
}

document.addEventListener("DOMContentLoaded", () => {
    updateBagCount();

    const quickButtons = document.querySelectorAll("[data-quick-buy]");
    const directAddButtons = document.querySelectorAll("[data-add-to-bag]");
    const modal = document.getElementById("quickBuyModal");
    const modalClose = document.getElementById("quickBuyClose");
    const modalImage = document.getElementById("quickBuyImage");
    const modalName = document.getElementById("quickBuyName");
    const modalSubtitle = document.getElementById("quickBuySubtitle");
    const modalPrice = document.getElementById("quickBuyPrice");
    const modalSize = document.getElementById("quickBuySize");
    const addToBagBtn = document.getElementById("addToBagBtn");
    const sizeOptions = document.querySelectorAll("[data-size-option]");
    directAddButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            const item = {
                id: button.dataset.id || Date.now().toString(),
                name: button.dataset.name || "DARKMATTER ITEM",
                subtitle: button.dataset.subtitle || "",
                price: Number(button.dataset.price || 0),
                image: button.dataset.image || "",
                size: button.dataset.size || ""
            };

            addToBag(item);

            if (typeof renderBagPage === "function") {
                renderBagPage();
            }
        });
    });

    let currentItem = null;
    let selectedSize = "";

    function setActiveSize(size) {
        selectedSize = size;
        if (modalSize) modalSize.textContent = size;

        sizeOptions.forEach((btn) => {
            if (btn.dataset.sizeOption === size) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    }

    quickButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            currentItem = {
                id: button.dataset.id || Date.now().toString(),
                name: button.dataset.name || "DARKMATTER ITEM",
                subtitle: button.dataset.subtitle || "",
                price: Number(button.dataset.price || 0),
                image: button.dataset.image || "",
                size: button.dataset.size || "39"
            };

            selectedSize = currentItem.size;

            if (modal && modalImage && modalName && modalSubtitle && modalPrice) {
                modalImage.src = currentItem.image;
                modalImage.alt = currentItem.name;
                modalName.textContent = currentItem.name;
                modalSubtitle.textContent = currentItem.subtitle;
                modalPrice.textContent = `฿ ${currentItem.price.toFixed(2)}`;

                setActiveSize(selectedSize);

                modal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    });

    sizeOptions.forEach((btn) => {
        btn.addEventListener("click", () => {
            setActiveSize(btn.dataset.sizeOption);
        });
    });

    if (modalClose && modal) {
        modalClose.addEventListener("click", () => {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        });
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }

    if (addToBagBtn) {
        addToBagBtn.addEventListener("click", () => {
            if (!currentItem) return;

            addToBag({
                ...currentItem,
                size: selectedSize
            });

            window.location.href = "bag.html";
        });
    }
});