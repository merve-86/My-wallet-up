const tarih = document.querySelector("#date")
const harcamaMiktari = document.querySelector("#harcama-miktar")
const harcamaAlani = document.querySelector("#harcama-alani")
const kaydet = document.querySelector("#kaydet")
const inputEkle = document.querySelector("#ekle-input");
const btnEkle = document.querySelector("#ekle-buton");
const harcamaTablosu = document.querySelector(".harcama-tablosu")
const tabloBody = document.querySelector(".tablo-body");
const gelir = document.querySelector(".gelir");
const gider = document.querySelector(".gider");
const kalan = document.querySelector(".kalan");
const btnTemizle = document.querySelector("#btn-temizle");

const harcamaEkle = () => {
    if (!tarih.value || !harcamaMiktari.value || !harcamaAlani.value){
        alert("Lütfen tüm alanları doldurunuz.")
        return;
    }

    let tabloTr = document.createElement("tr");
    let tabloTarih = document.createElement("td");
    let tabloHarcamaAlani = document.createElement("td");
    let tabloMiktar = document.createElement("td");
    let tabloIslem = document.createElement("td");
    let silButon = document.createElement("button");

    tabloTarih.textContent = tarih.value;
    tabloHarcamaAlani.textContent = harcamaAlani.value;
    tabloMiktar.textContent = harcamaMiktari.value;
    silButon.textContent = "🗑";

    tabloTr.appendChild(tabloTarih);
    tabloTr.appendChild(tabloHarcamaAlani);
    tabloTr.appendChild(tabloMiktar);
    tabloTr.appendChild(tabloIslem);
    tabloIslem.appendChild(silButon);

    tabloBody.appendChild(tabloTr);

    silButon.onclick = function () {
        // this.parentElement.parentElement.remove()
        tabloTr.remove()  
        giderHesapala()  
        kalanHesapla()    
    }    
}


kaydet.addEventListener("click", () => {
    harcamaEkle()  
    giderHesapala(); 
    kalanHesapla() 

    localStorage.setItem("gider", gider.textContent)
})

btnEkle.addEventListener("click", () => {
    if(!inputEkle.value){
        alert("lütfen gelirinizi giriniz");
        return;
    }

    gelir.textContent = Number(gelir.textContent) + Number(inputEkle.value);
    inputEkle.value =""
    kalanHesapla()

    localStorage.setItem("gelir", gelir.textContent);


})

const giderHesapala = () => {
    let toplamGider = Array.from(document.querySelectorAll(".harcama-tablosu td:nth-child(3)"))
    .reduce((toplam, td ) => toplam + Number(td.textContent), 0 );
    gider.textContent = toplamGider    
}

const kalanHesapla = () => {
    kalan.textContent = Number(gelir.textContent) - Number(gider.textContent)

    kalan.style.color = kalan.textContent < 0
     ? "red"
     : "black";
    
    localStorage.setItem("kalan", kalan.textContent);
}


btnTemizle.addEventListener("click", () => {
  tarih.value = ""
  harcamaMiktari.value = ""
  harcamaAlani.value = ""
  gelir.textContent = "0"
  gider.textContent = "0"
  kalan.textContent = "0"
  tabloBody.textContent = ""
});

document.addEventListener("DOMContentLoaded", () => {
    gider.textContent = localStorage.getItem("gider")
    gelir.textContent = localStorage.getItem("gelir")
    kalan.textContent = localStorage.getItem("kalan")
})






