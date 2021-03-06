import { Component, OnInit, Input } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { ConfigService } from '../config/config.service';

import { interval, Subscription } from 'rxjs';

export interface Wish {
  itemId: string,
  itemName: string,
  itemImgUrl: string,
  itemGender: string,
  itemClassefication: string,
  itemSizes: string,
  itemPrice: string,
  itemPurchases: string,
  userId?: string
  userName?: string,
  userEmail?: string,
  userPhone?: number,
  userAddress?: string,
}
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() item;
  subscription: Subscription;
  liked = false
  carted = false
  constructor(public router: Router, public config: ConfigService) { }

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {

    let wishs = JSON.parse(localStorage.getItem("wishs"))
    this.liked = wishs.some(x => x.itemId === this.item._id)
    this.subscription = interval(10).subscribe(val => this.carter());
  }

  carter() {
    let cart = JSON.parse(localStorage.getItem("myCart"))
    this.carted = cart.some(x => x.itemId === this.item._id)
  }

  addWish(item) {
    this.liked = !this.liked
    let wishs = JSON.parse(localStorage.getItem("wishs"))
    let newWishs = []
    if (wishs) {
      wishs.map(x => {
        newWishs.push(x)
      })
    }

    var data: Wish = {
      itemId: item._id,
      itemName: item.name,
      itemImgUrl: item.imgUrl,
      itemGender: item.gender,
      itemClassefication: item.classification,
      itemPrice: item.price,
      itemSizes: item.sizes,
      itemPurchases: item.purchases,
      userId: "",
      userName: "",
      userEmail: "",
      userPhone: 0,
      userAddress: "",

    }

    var re = newWishs.some(x => x.itemId === data.itemId)
    if (!re) {
      newWishs.push(data)
      localStorage.setItem('wishs', JSON.stringify(newWishs))
    } else {
      newWishs = newWishs.filter(x => x.itemId !== data.itemId)
      localStorage.setItem('wishs', JSON.stringify(newWishs))
    }
  }

  openMediumModal(item) {
    this.carted = !this.carted
    let cart = JSON.parse(localStorage.getItem("myCart"))
    let newCart = []
    if (cart) {
      newCart = cart.map(x => {
        return x
      })
    }
    let data = {
      itemId: item._id,
      itemName: item.name,
      itemPrice: item.price,
      itemGender: item.gender,
      itemClassefication: item.classification,
      itemSizes: item.sizes.split(' '),
      itemImgUrl: item.imgUrl,
      itemPurchases: item.purchases,
      userName: "",
      userEmail: "",
      userPhone: "",
      userAddress: "",
      userId: "",
      selectedSize: 0,
      itemQua: 1
    }
    var re = newCart.some(x => x.itemId === data.itemId)
    if (!re) {
      newCart.push(data)
      localStorage.setItem('myCart', JSON.stringify(newCart))
    } else {
      newCart = newCart.filter(x => x.itemId !== data.itemId)
      localStorage.setItem('myCart', JSON.stringify(newCart))
    }

  }
  navItem(item) {
    this.router.navigate(['deps/item', item._id]);
  }

}
