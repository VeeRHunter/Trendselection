import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController, ToastController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';

import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ApiserverProvider } from '../../providers/apiserver/apiserver';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})

export class HomePage {
    @ViewChild(Slides) slides: Slides;


    public date_infor: any;
    // public dateList = ["on May 03", "on May 04", "on May 05", "on May 06", "on May 07", "on May 08", "on May 09", "on May 10", "on May 11", "on May 12", "on May 13", "on May 14"];

    public social_info: any;
    public tend_info: any;

    public imageList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
    public person_image: any[];

    public topicList = [34, 44, 49, 65, 34, 22, 88, 73, 21, 59, 90];
    public topic_List: any[];
    public topic_image_List: any[];

    public samArray = [0, 1, 2, 3, 4, 5, 6];

    public image_index: any;

    public date_index: any;
    public social_index: any;
    public topic_index: any;
    public candidate_index: any;

    public dateList: any[];
    public socialList: any[];

    public canFullData: any;

    public person_list: any[];
    public slide_index = 0;

    public man_imageList = ["1_CBN_TDP", "2_YS Jagan_YSR", "3_Pavan Kalyan_JSP", "4_Jayaprakash_JSP", "5_Nara Lokesh_TDP", "6_YS Vijayamma_YSR", "7_Bhuma Akila_TDP", "8_Roja_YSR", "9_Venkaiah Naidu_BJP", "10_Bonda Uma_TDP", "11_Undavalli AK_JSP", "12_Payyavula Keshav_TDP", "13_RM Naidu_TDP", "14_VijaySai Reddy_YSR", "15_Ganta SVR_TDP"];

    public topic_imageList = ["Topic01_Agriculture", "Topic02_Development", "Topic03_Village", "Topic04_Women", "Topic05_Education", "Topic06_Transpot", "Topic07_Industries", "Topic08_GovService", "Topic09_Benifits", "Topic10_Law"];



    constructor(public navCtrl: NavController, public navParams: NavParams, public apiserver: ApiserverProvider,
        public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

    }

    ionViewDidLoad() {
        // localStorage.clear();

        this.makeRandom();

        // console.log(this.navParams.data.navParams);
        this.get_Data();
        // } else {
        //   this.dateList = new Array();
        //   this.socialList = new Array();

        //   this.canFullData = JSON.parse(localStorage.getItem("candidateFullData"));
        //   console.log(this.canFullData);

        //   this.social_index = this.navParams.data.navParams.social_index;

        //   var temp = this.canFullData[this.social_index];
        //   for (var keys in temp) {
        //     this.dateList.push(keys);
        //   }
        //   this.date_index = this.navParams.data.navParams.date_index;
        //   this.image_index = this.navParams.data.navParams.image_index;
        //   console.log(this.image_index);
        //   this.set_candidateList();
        //   this.set_topicList();
        //   this.initial_slide();
        // }
    }

    makeRandom() {
        let temArray = new Array();
        while (this.samArray.length > 0) {
            let randIndex = Math.floor(Math.random() * this.samArray.length);
            temArray.push(this.samArray[randIndex]);
            this.samArray.splice(randIndex, 1);
        }
        console.log(temArray);
    }

    click_photo(index) {
        console.log(index);
        this.image_index = index;
        if (!this.person_image[index].selected) {
            this.image_index = index;
            for (let list of this.person_image) {
                list.selected = false;
                list.avail = true;
            }
            this.person_image[index].selected = true;
            this.person_image[index].avail = false;
            this.set_topicList();
        }
    }

    select_date() {
        this.set_candidateList();
        this.set_topicList();
    }
    select_social() {
        this.set_candidateList();
        this.set_topicList();
    }

    goto_detail(index) {
        console.log(index);
        console.log(this.topic_List[index]);
        let param_array = { "date_index": "", "social_index": "", "topic_index": 0 };
        param_array.date_index = this.date_index;
        param_array.social_index = this.social_index;
        param_array.topic_index = index;
        this.navCtrl.push(DetailPage, { navParams: param_array });
    }

    set_candidateList() {
        this.person_image = new Array();
        this.man_imageList = new Array();

        let key_array = new Array();
        for (var keys in this.canFullData[this.social_index][this.date_index]) {
            let array_sam = keys.split("_");
            key_array.push(parseInt(array_sam[0]));
            this.man_imageList.push(keys);
        }

        this.bubbleSort(key_array, this.man_imageList);

        for (let list of this.man_imageList) {
            let sam = { "image": "", "name": "", "flag_image": "", "selected": false, "avail": false };
            let array_sam = list.split("_");
            sam.name = array_sam[1];
            sam.image = "assets/imgs/man_image/" + list + ".jpeg";
            sam.flag_image = "assets/imgs/Flags/" + array_sam[2] + ".jpeg";
            sam.avail = true;
            this.person_image.push(sam);
        }
        this.person_image[this.image_index].avail = false;
        this.person_image[this.image_index].selected = true;

    }

    set_topicList() {
        this.topic_List = new Array();

        let set_topicOrder = new Array();

        for (let list of this.canFullData[this.social_index][this.date_index][this.man_imageList[this.image_index]]["candicate_data"]) {
            let sam = { "width": "", "name_width": "", "name": "", "topic_image": "", "value": 0 };
            sam.width = list.value + "%";
            sam.value = list.value;

            let array_sam = list.keywords.split("_");
            sam.name = array_sam[1];
            sam.topic_image = "assets/imgs/topic/" + list.keywords + ".jpeg";
            set_topicOrder.push(parseInt(array_sam[0].replace("Topic")));

            if (sam.value > 45) {
                sam.name_width = sam.value + "%";
            } else {
                sam.name_width = (100 - sam.value) + "%";
            }
            this.topic_List.push(sam);
        }

        this.bubbleSort(set_topicOrder, this.topic_List);
    }


    refresh() {
        localStorage.clear();
        this.get_Data();
    }

    initial_slide() {
        setTimeout(() => {
            console.log(this.slides);
            if (this.slides.length() != null) {
                this.slides.slideTo(this.image_index);
            } else {
                this.initial_slide();
            }
        }, 100);
    }

    get_Data() {

        this.person_image = new Array();
        this.topic_List = new Array();
        this.dateList = new Array();
        this.socialList = new Array();
        this.man_imageList = new Array();

        let loading = this.loadingCtrl.create({
            content: "Please Wait..."
        });
        loading.present();

        this.apiserver.getCandidateData().then((result) => {
            console.log((result));
            loading.dismiss();
            this.canFullData = Object(result);

            console.log(this.canFullData.twitter);
            this.setImageIndex();

            localStorage.setItem("candidateFullData", JSON.stringify(this.canFullData));

            for (var keys in this.canFullData) {
                this.socialList.push(keys);
            }

            this.setSocialIndex();

            var temp = this.canFullData[this.social_index];
            for (var keys1 in temp) {
                this.dateList.push(keys1);
            }

            this.setDateIndex();


            this.set_candidateList();
            this.set_topicList();


            this.initial_slide();


        }, (err) => {
            let toast = this.toastCtrl.create({
                message: "No Network",
                duration: 2000
            })
            toast.present();
            loading.dismiss();
        });
    }

    setSocialIndex() {
        if (typeof (this.navParams.data.navParams) == "undefined") {
            this.social_index = "twitter";
        } else {
            this.social_index = this.navParams.data.navParams.social_index;
        }
    }

    setImageIndex() {
        if (typeof (this.navParams.data.navParams) == "undefined") {
            this.image_index = 0;
        } else {
            this.image_index = this.navParams.data.navParams.image_index;
        }
    }

    setDateIndex() {
        if (typeof (this.navParams.data.navParams) == "undefined") {
            this.date_index = this.dateList[0];
        } else {
            this.date_index = this.navParams.data.navParams.date_index;
        }
    }

    bubbleSort(items, realarray) {
        var length = items.length;
        for (var i = 0; i < length; i++) { //Number of passes
            for (var j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
                //Compare the adjacent positions
                if (items[j] > items[j + 1]) {
                    //Swap the numbers
                    var tmp = items[j];  //Temporary variable to hold the current number
                    items[j] = items[j + 1]; //Replace current number with adjacent number
                    items[j + 1] = tmp; //Replace adjacent number with current number

                    var ttemp = realarray[j];
                    realarray[j] = realarray[j + 1];
                    realarray[j + 1] = ttemp;
                }
            }
        }
    }



}
