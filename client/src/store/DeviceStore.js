import {makeAutoObservable} from "mobx";

export default class DeviceStore{
    constructor() {
        this._types = [
            {id: 1, name: "TV"},
            {id: 2, name: "AGD"}
        ]
        this._brand = [
            {id: 1, name: "Sony"},
            {id: 2, name: "LG"}
        ]
        this._device = [
            {id: 1, name: "Nj", price: 2500, rating: 5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/" +
                    "Lake_mapourika_NZ.jpeg/800px-Lake_mapourika_NZ.jpeg", typeId: 1, brandId: 2 },
            {id: 2, name: "Nj23", price: 2500, rating: 4, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/" +
                    "23/Lake_mapourika_NZ.jpeg/800px-Lake_mapourika_NZ.jpeg", typeId: 2, brandId: 1 },
            {id: 3, name: "N14", price: 2500, rating: 3, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/" +
                    "23/Lake_mapourika_NZ.jpeg/800px-Lake_mapourika_NZ.jpeg", typeId: 2, brandId: 2 },
            {id: 4, name: "N45", price: 2500, rating: 4, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/" +
                    "23/Lake_mapourika_NZ.jpeg/800px-Lake_mapourika_NZ.jpeg", typeId: 1, brandId: 1 }
        ]
        this._selectedType = {}
        this._selectedBrand = {}
        makeAutoObservable(this)
    }
    setTypes(types){
        this._types = types
    }
    setBrands(brands){
        this._brand = brands
    }
    setDevices(devices){
        this._device = devices
    }
    setSelectedType(type){
        this._selectedType=type
    }
    setSelectedBrand(brand){
        this._selectedBrand=brand
    }
    get types() {
        return this._types
    }
    get brands() {
        return this._brand
    }
    get devices() {
        return this._device
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
}