<template>
  <div class="card">
    <div class="card__video">
      <img :src="video.snippet.thumbnails.medium.url" alt="video thumbnail">
    </div>
    <div class="card__text">
      <div class="card__title">{{ video.snippet.title }}</div>
      <div class="card__description">{{ video.snippet.channelTitle }}</div>
      <div class="card__watchers">
        {{ views }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoItem',
  props: {
    video: {
      type: Object,
    },
  },
  computed: {
    /* eslint-disable */
    views() {
      const views = this.video.statistics.viewCount;
      const viewsTitle = views.length == 6 ? 'тыс. просмотров' :
      views.length  > 6 && views.length <= 9 ? 'млн. просмотров' :
      views.length >= 10 ? 'млдр. просмотров' : 'просмотров';

      switch (views.length) {
        case 6 :
          return `${this.video.statistics.viewCount.slice(0, 3)}  ${viewsTitle}`;
          break;
        case 7 :
          return `${this.video.statistics.viewCount.slice(0, 1)}  ${viewsTitle}`;
          break;
        case 8:
          return `${this.video.statistics.viewCount.slice(0, 2)} ${viewsTitle}`;
          break;
        case 9:
          return `${this.video.statistics.viewCount.slice(0, 3)} ${viewsTitle}`;
          break;
          case 10:
          return `${this.video.statistics.viewCount.slice(0, 1)} ${viewsTitle}`;
        default:
          return this.video.statistics.viewCount + ' просмотров';

      }
    },
  },

};
</script>

<style scoped lang="scss">
.card {
  max-width: 245px;

  .card__video {
    img {
      max-width: 245px;
      max-height: 138px;
    }
  }

  .card__title {
    margin-bottom: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .card__description {
    color: rgba(23, 23, 25, 0.3);
    margin-bottom: 5px;
  }

  .card__watchers {
    color: rgba(23, 23, 25, 0.3);
  }
}

.cards-list {
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
  max-width: 540px;

  .card {
    display: grid;
    grid-template-columns: auto 1fr;
    margin-bottom: 15px;

    &__text {
      padding-left: 10px;
      overflow-wrap: break-word;
      inline-size: 400px;
      overflow: hidden;
    }

    &__title {
      white-space: normal;
    }
  }
}

</style>
