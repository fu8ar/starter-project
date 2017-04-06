# SASS Folder

This is where all the project sass files are kept.

**Bootstrap 4**

It comes with Twitter Bootstrap 4 alpha 6. - https://v4-alpha.getbootstrap.com/

**Uses ITCSS**

https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/

ITCSS stands for Inverted Triangle CSS and it helps you to organize your project CSS files in such way that you can better deal with (not always easy-to-deal with) CSS specifics like global namespace, cascade and selectors specificity.

The folder structure, starting from least specific and going down to most specific, are as follows:

**Settings**

Used with preprocessors and contain font, colors definitions, etc.

**Tools**

Globally used mixins and functions. It’s important not to output any CSS in the first 2 layers.

**Generic**

Reset and/or normalize styles, box-sizing definition, etc. This is the first layer which generates actual CSS.

**Elements**

Styling for bare HTML elements (like H1, A, etc.). These come with default styling from the browser so we can redefine them here.

**Objects**

Class-based selectors which define undecorated design patterns, for example media object known from OOCSS.

**Components**

Specific UI components. This is where majority of our work takes place and our UI components are often composed of Objects and Components.

**Trumps/Utilities**

utilities and helper classes with ability to override anything which goes before in the triangle, eg. hide helper class