### 05.12.2021 update

#### Main:
- fixed erroneous console log during mouseOut event

#### UI:
- added label for Color Picker and RainbowColor brush, to avoid confusion
- rainbowColor brush label is being highlighted when the button is toggled
- rounded width-slider a bit

### 28.11.2021 update

#### Fixes: 
- Shapes are being correctly drawn in mouseOut scenarios

#### Main:
- added mouseOut event due to color changing bug and incorrect shape drawing when mouseOut


### 27.11.2021 update

#### Fixes: 
- fixed fps drop in browser console mode, with rainbow brush mode on
- fixed btns color palette default cursor when in logo nyancat mode
- fixed the height/width of the canvas and the header
- fixed wrong value color warning
- fixed errors - wrong value (underline: disabled) and added key properties to map function in color palette btns
- fixed save/clear buttons size
- fixed btn hover fading shadow effect for rainbow btn

#### Main:
- canvas and header resize based on the resolution
- mouse position is being calculated accurately for different resolutions
- div header is replaced by header element
- many div tweaks and css classes tweaks
- merged brush and brush rainbow classes
- combined brushes and tools into 2 with common functions
- a few disabled buttons now don't have shadow on hover

#### Updates / UI:
- adjusted width/height of cat logo
- added color + shadow effect for nyanCat mode, based on the current color
- added animated logo
- select, width, color tools are being properly hidden during nyanCat mode
- increased width-slider width
- unified colors tools btn styleSheets 
- transfered colors palette btns style to css
- replaced the github pic with a better quality pic
