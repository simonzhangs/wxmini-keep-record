Component({
    properties: {
        imageUrl:{
            type: String,
            value: ''
        }
    },
    data: {
        animation: null
    },
    lifetimes: {
        attached: function(){
            this.animation = wx.createAnimation({
                duration: 10000,
                timingFunction: 'linear',
                delay: 0,
                transformOrigin: '50% 50% 0'
            });
            this.animation.rotate(360).step();
            this.setData({
                animation: this.animation.export()
            })
        },
    },
    methods: {}
})