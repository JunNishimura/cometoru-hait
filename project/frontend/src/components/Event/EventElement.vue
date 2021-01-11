<template>
    <div class="event">
        <div class="event__header">
            <div class="event__stock">
                <span class="hover-msg">{{ hoverMessage }}</span>
                <span :class="stockColor" class="stock-icon" @click="stockEvent"><FontAwesomeIcon :icon="['fas', 'bookmark']" size="lg" /></span>
            </div>
            <div class="event__title">
                <a :href="url">{{ name }}</a>
            </div>
        </div>
        <div class="event__info">
            <div class="event__location">
                <div><FontAwesomeIcon class="icon" :icon="['fas', 'map-marker-alt']" /><span>{{ location }}</span></div>
            </div>
            <div class="event__date">
                <div><FontAwesomeIcon class="icon" :icon="['fas', 'calendar-day']" /><span>{{ schedule }}</span></div>
            </div>
        </div>
        <div class="event__detail">
            <p>{{ detail }}</p>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';

export default {
    props: ['eventId', 'name', 'detail', 'schedule',  'location', 'url'],
    data() {
        return {
            stockState: false,
        }
    },
    computed: {
        myUserId() {
            return this.$store.getters['auth/userId'];
        },
        myEventStocks() {
            return this.$store.getters['myData/myEventIDs'];
        },
        stockColor() {
            return this.stockState ? 'filled' : 'empty';
        },
        hoverMessage() {
            return this.stockState ? 'ストックから外す' : 'ストックする';
        }
    },
    methods: {
        stockEvent() {
            if (this.stockState) {
                // すでに追加されているならストックから除く
                apiHelper.removeEventStock(this.eventId, this.myUserId)
                .then(() => {
                    this.stockState = false;
                    this.$store.dispatch('myData/removeEventStock', {
                        eventId: this.eventId
                    })
                }).catch(err => {
                    console.log(err);
                })
            } else {
                // もしまだストックされていないなら追加する
                apiHelper.addEventStock(this.eventId, this.myUserId)
                .then(() => {
                    this.stockState = true;
                    this.$store.dispatch('myData/addEventStock', {
                        eventId: this.eventId
                    });
                }).catch(err => {
                    console.log(err);
                })
            }
        },
    },
    created() {
        if (this.myEventStocks != null) {
            this.stockState = this.myEventStocks.includes(this.eventId) ? true : false;
        }
    }
}
</script>

<style scoped>
.event {
    padding: 1rem;
    width: 35rem;
    transition: all .5s ease-out;
    background-color: #fff;
    border: 1px solid #dddddd;
}

.event__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.event__title a {
    color: #000;
    display: block;
    text-decoration: none;
    font-size: 22px;
    font-weight: bold;
}

.event__title a:hover {
    border-bottom: 1px solid #000;
}

.event__stock {
    margin-right: 1.0rem;
    cursor: pointer;
    position: relative;
}

.event__stock:hover > .hover-msg {
    opacity: 1;
    transform: translate(-50%, -30px);
}

.hover-msg {
    font-size: 14px;
    font-weight: bold;
    background-color: #1e1e1eaa;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    width: 8rem;
    padding: 0.1rem 0.5rem;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    opacity: 0;
    pointer-events: none;
    transition: 0.5s;
}

.event__info {
    margin: 1rem 0;
    display: flex;
    justify-content: flex-start;
}

.event__location {
    margin-right: 1.5rem;
}

.event__location span {
    color: #444;
}

.event__date span {
    color: #e22;
    font-weight: bold;
}

.event__location span,
.event__date span {
    font-size: 16px;
}

.event__location .icon,
.event__date .icon {
    margin-right: 0.5rem;
}

.event__detail {
    /* background-color: #eee; */
    border-top: 1px solid #eee;
    padding: 1.5rem;
    font-size: 16px;
    text-align: left;
}


.filled {
    color: #ffbb3c;
}

.empty {
    color: #000;
}
</style>