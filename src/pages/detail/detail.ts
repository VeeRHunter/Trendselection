import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ToastController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiserverProvider } from '../../providers/apiserver/apiserver';



/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  @ViewChild(Slides) slides: Slides;

  public date_infor: any;
  // public dateList = ["on May 03", "on May 04", "on May 05", "on May 06", "on May 07", "on May 08", "on May 09", "on May 10", "on May 11", "on May 12", "on May 13", "on May 14"];

  public social_info: any;
  public tend_info: any;
  public image_index: any;
  public slide_index = 0;

  public date_index: any;
  public social_index: any;
  public topic_index = 0;
  public totalFullData: any;

  public topic_total: any[];
  public dateList: any[];
  public socialList: any[];

  public person_total: any[];
  public topic_image_List: any[];

  // public man_imageList = ["Bonda Uma", "Jayaprakash Narayan", "N Chandrababu Naidu", "Nara Lokesh", "Pavan Kalyan", "Payyavula Keshav", "ram mohan naidu", "Roja Selvamani", "Undavalli Aruna Kumar", "Venkaiah Naidu", "YS Jagan", "YS Sharmila"];

  public topic_imageList = ["Topic01_Agriculture", "Topic02_Developmnt", "Topic03_Villages", "Topic04_Women", "Topic05_Education", "Topic06_Transpot", "Topic07_Industries", "Topic08_GovService", "Topic09_Benifits", "Topic10_Law"];

  public axisX_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  public person_list: any[];

  public man_imageList = ["1_CBN_TDP", "2_YS Jagan_YSR", "3_Pavan Kalyan_JSP", "4_Jayaprakash_JSP", "5_Nara Lokesh_TDP", "6_YS Vijayamma_YSR", "7_Bhuma Akila_TDP", "8_Roja_YSR", "9_Venkaiah Naidu_BJP", "10_Bonda Uma_TDP", "11_Undavalli AK_JSP", "12_Payyavula Keshav_TDP", "13_RM Naidu_TDP", "14_VijaySai Reddy_YSR", "15_Ganta SVR_TDP"];



  constructor(public navCtrl: NavController, public navParams: NavParams, public apiserver: ApiserverProvider,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');

    this.get_Data();
  }

  initial_slide() {
    setTimeout(() => {
      console.log(this.slides);
      if (this.slides.length() != null) {
        this.slides.slideTo(this.topic_index);
      } else {
        this.initial_slide();
      }
    }, 100);
  }


  select_date() {
    console.log(this.date_index);
    this.set_topicList();
    this.set_candidateList();
  }
  select_social() {
    console.log(this.social_index);
    this.set_topicList();
    this.set_candidateList();
  }

  set_topicList() {

    this.topic_total = new Array();
    this.topic_imageList = new Array();


    let key_array = new Array();
    for (var keys in this.totalFullData[this.social_index][this.date_index]) {

      let array_sam = keys.split("_");
      key_array.push(parseInt(array_sam[0]));
      this.topic_imageList.push(keys);
    }

    console.log(this.topic_imageList);

    for (let list of this.topic_imageList) {

      let array_sam = list.split("_");

      let sam = { "topic_name": "", "topic_image": "", "sel_state": false };

      sam.topic_image = "assets/imgs/topic/" + list + ".jpeg";
      sam.topic_name = array_sam[1];
      this.topic_total.push(sam);
    }
    console.log(this.topic_total);
    this.bubbleSort(key_array, this.topic_total);

    this.topic_total[this.topic_index].sel_state = true;

  }

  set_candidateList() {
    this.person_total = new Array();

    let set_topicOrder = new Array();

    console.log(this.totalFullData);
    console.log(this.social_index);
    console.log(this.date_index);
    console.log(this.topic_index);
    console.log(this.totalFullData[this.social_index][this.date_index]);

    for (let list of this.totalFullData[this.social_index][this.date_index][this.topic_imageList[this.topic_index]]["keywords-data"]) {

      let sam_width = list.value;
      let sam = { "width": "", "name_width": "", "person_name": "", "man_image": "", "value": 0 };
      sam.width = sam_width + "%";
      sam.value = sam_width;


      let array_sam = list.candidate_list.split("_");
      sam.person_name = array_sam[1];
      sam.man_image = "assets/imgs/man_image/" + list.candidate_list + ".jpeg";
      set_topicOrder.push(parseInt(array_sam[0].replace("Topic")))

      if (sam_width > 55) {
        sam.name_width = sam_width + "%";
      } else {
        sam.name_width = (100 - sam_width) + "%";
      }
      this.person_total.push(sam);
    }
    console.log(this.person_total);
    console.log("here");

    this.bubbleSort(set_topicOrder, this.person_total);
    console.log(this.person_total);

  }

  click_photo(index) {
    if (!this.topic_total[index].sel_state) {
      for (let list of this.topic_total) {
        list.sel_state = false;
      }
      this.topic_total[index].sel_state = true;
      this.topic_index = index;

      this.set_candidateList();
    }
  }

  goto_home(index) {

    let param_array = { "date_index": "", "social_index": "", "image_index": 0 };
    param_array.date_index = this.date_index;
    param_array.social_index = this.social_index;
    param_array.image_index = index;

    this.navCtrl.push(HomePage, { navParams: param_array });
  }


  refresh() {
    localStorage.clear();
    this.get_Data();
  }


  get_Data() {

    this.dateList = new Array();
    this.socialList = new Array();
    this.topic_total = new Array();
    this.person_total = new Array();
    this.topic_imageList = new Array();

    let loading = this.loadingCtrl.create({
      content: "Please Wait..."
    });

    loading.present();

    this.apiserver.getkeywordsData().then((result) => {
      console.log(Object(result));
      loading.dismiss();


      this.totalFullData = Object(result);

      for (var keys in this.totalFullData) {
        this.socialList.push(keys);
      }

      this.social_index = this.navParams.data.navParams.social_index;
      this.date_index = this.navParams.data.navParams.date_index;
      this.topic_index = this.navParams.data.navParams.topic_index;

      var temp = this.totalFullData[this.social_index];
      for (var keys1 in temp) {
        this.dateList.push(keys1);
      }

      this.set_topicList();
      this.set_candidateList();

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
