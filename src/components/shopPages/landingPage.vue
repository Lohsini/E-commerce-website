<template>
  <div class="home">

    <div class="jumbotron">
      <div>
        <h1>關於貓咪的賣場</h1>
        <h2>喵喵首頁</h2>
        <p>歡迎光臨來到首頁</p>
      </div>
    </div>

    <div class="about">
      <div class="container">
        <div class="founders">
          <div class="person" v-for="(item, index) in people" :key="index">
            <div class="image">
              <img :src="item.img" alt="person">
            </div>
            <p>{{ item.introduction }}</p>
          </div>
        </div>
        <div class="introduction">
          <p v-for="(item, index) in 3" :key="index">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Voluptatem quae voluptas unde optio aut beatae. Aliquid mollitia,
            debitis vitae optio voluptas esse minus iusto aut!
            Voluptatem quae voluptas unde optio aut beatae. Aliquid mollitia,
            debitis vitae optio voluptas esse minus iusto aut!
          </p>
        </div>
      </div>
    </div>

    <div class="jumbotron">
      <div>
        <h1>關於貓咪的賣場</h1>
        <h2>喵喵</h2>
        <p>歡迎光臨</p>
      </div>
    </div>

    <div class="pictures">
      <div class="container">
        <div class="image" v-for="(item, index) in pictures" :key="index">
          <img :src="item" alt="pic">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import person1 from '@/assets/person1.jpg';
import person2 from '@/assets/person2.jpg';
import person3 from '@/assets/person3.jpg';

import pictures1 from '@/assets/pictures1.jpg';
import pictures2 from '@/assets/pictures2.jpg';
import pictures3 from '@/assets/pictures3.jpg';
import pictures4 from '@/assets/pictures4.jpg';
import pictures5 from '@/assets/pictures5.jpg';
import pictures6 from '@/assets/pictures6.jpg';
import pictures7 from '@/assets/pictures7.jpg';
import pictures8 from '@/assets/pictures8.jpg';
import pictures9 from '@/assets/pictures9.jpg';
import pictures10 from '@/assets/pictures10.jpg';
import pictures11 from '@/assets/pictures11.jpg';
import pictures12 from '@/assets/pictures12.jpg';

export default {
  components: {
  },
  data() {
    return {
      people: [
        {
          img: person1,
          introduction: '創辦人1',
        },
        {
          img: person2,
          introduction: '創辦人2',
        },
        {
          img: person3,
          introduction: '創辦人3',
        },
      ],
      pictures: [
        pictures1,
        pictures2,
        pictures3,
        pictures4,
        pictures5,
        pictures6,
        pictures7,
        pictures8,
        pictures9,
        pictures10,
        pictures11,
        pictures12,
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.jumbotron{
  margin: 0;
}
.about{
  max-width: 1000px;
  margin: 50px auto;
  .container{
    .founders{
      display: flex;
      justify-content: space-around;
      .image{
        border-radius: 100%;
        width: 200px;
        height: 200px;
        overflow: hidden;
        img{
          width: 100%;
          object-fit: cover;
        }
      }
      p{
        margin: 10px 0;
      }
    }
    .introduction{
      text-align: justify;
      margin: 10px 0;
    }
  }
}
.pictures{
  margin: 50px auto;
  .container{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .image{
      width: 200px;
      overflow: hidden;
      margin: 20px;
      img{
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
