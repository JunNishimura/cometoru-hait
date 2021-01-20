<template>
    <div id="idea__reputation-section">
        <div class="chart">
            <Plotly :data="chartData" :layout="chartLayout" :display-mode-bar="false"></Plotly>
            <span>現在の評価数: {{ reputationCount }}</span>
        </div>
    </div>
</template>

<script>
import apiHelper from '@/services/apiHelper.js';
import utils from '@/services/utils.js';
import { Plotly } from 'vue-plotly'
// import ReputationForm from '@/components/Idea/Detail/ReputationForm.vue';

export default {
    components: {
        Plotly,
        // ReputationForm,
    },
    props: ['ideaId'],
    data() {
        return {
            loadComplete: false,
            reputationData: { // 各要素は配列を格納している
                interesting: [],
                novelty: [],
                possibility: [],
            },
            reputationMean: {
                interesting: 0,
                novelty: 0,
                possibility: 0,
            },
            readyDrawChart: false,
            chartData: null,
            chartLayout: null,
        }
    },
    computed: {
        reputationCount() {
            return this.reputationData.interesting.length;
        }
    },
    methods: {
        drawChart() {
            if (this.reputationData.interesting.length > 0) {
                // 評価数が0でなければ平均値を計算する
                this.reputationMean = {
                    interesting: utils.calcArrayMean(this.reputationData.interesting),
                    novelty: utils.calcArrayMean(this.reputationData.novelty),
                    possibility: utils.calcArrayMean(this.reputationData.possibility)
                };
            } else {
                // 評価数が0の場合は0にセットする
                this.reputationMean = {
                    interesting: 0,
                    novelty: 0,
                    possibility: 0
                };
            }

            // ここで描画する
            this.chartData = [{
                type: 'scatterpolar',
                r: [this.reputationMean.interesting, this.reputationMean.novelty, this.reputationMean.possibility],
                theta: ['面白さ', '新規性', '実現可能性'],
                fill: 'toself'
            }]
            this.chartLayout = {
                polar: {
                    radialaxis: {
                        visible: true,
                        range: [0, 5]
                    }
                },
                autosize: false,
                width: 350,
                height: 350,
                margin: {
                    pad: 0,
                },
                showlegend: false,
                // paper_bgcolor: '#fff',
                paper_bgcolor: '#f9f2e9',
            }

            this.readyDrawChart = true;
        },
    },
    created() {
        // アイデアの評価全て読み込む
        apiHelper.loadIdeaReputations(this.ideaId)
        .then( res => {
            this.reputationData.interesting = res.map( rep => rep.interesting );
            this.reputationData.novelty = res.map( rep => rep.novelty );
            this.reputationData.possibility = res.map( rep => rep.possibility );
            
            this.loadComplete = true;

            this.drawChart();
        }).catch( err => {
            console.log("error to get idea data at IdeaReputationPage: ", err);
        })
    },
}
</script>

<style scoped>
#idea__reputation-section {
    background-color: #f7f2e9;
}
</style>