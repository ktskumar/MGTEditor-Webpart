import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration, PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import styles from './MgtEditorWebPart.module.scss';
import * as strings from 'MgtEditorWebPartStrings';
import { Providers, SharePointProvider } from '@microsoft/mgt-spfx';
import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';
import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme,
  ISemanticColors
} from '@microsoft/sp-component-base';

export interface IMgtEditorWebPartProps {
  htmlCode: string;
  jsCode: string;
  title: string;
}

export default class MgtEditorWebPart extends BaseClientSideWebPart<IMgtEditorWebPartProps> {

  private _themeProvider: ThemeProvider;
private _themeVariant: IReadonlyTheme | undefined;

  protected async onInit() {
    //Providers.globalProvider = new SharePointProvider(this.context);

    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

  // If it exists, get the theme variant
  this._themeVariant = this._themeProvider.tryGetTheme();

  // Register a handler to be notified if the theme variant changes
  this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

  

    if (!Providers.globalProvider) {
      Providers.globalProvider = new SharePointProvider(this.context);
    }

    return super.onInit();
  }

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }

  public render(): void {

    var semanticColors: any | undefined = this._themeVariant && this._themeVariant.semanticColors;

    this.domElement.innerHTML = `    
      <div class="${styles.mgtEditor}">
        <div class="${styles.webPartHeader}">
          <div class="${styles.webPartTitle}" style="color:${semanticColors.bodyText}">
            <span role="heading" aria-level="2">${this.properties.title}</span>
          </div>
        </div>
        <div class="${styles.container}">
          <div class="${styles.row}"> 
            ${this.properties.htmlCode != undefined ? this.properties.htmlCode : ""}
          </div>
        </div>      
      </div>`;

      var newScript = document.createElement("script");
      var inlineScript = document.createTextNode(this.properties.jsCode);
      newScript.appendChild(inlineScript);
      this.domElement.appendChild(newScript);
  }



  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title',{
                  label:'Webpart Title'

                }),
                PropertyFieldCodeEditor('htmlCode', {
                  label: 'HTML',
                  panelTitle: 'Edit HTML',
                  initialValue: this.properties.htmlCode,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'codeEditorFieldId',
                  language: PropertyFieldCodeEditorLanguages.HTML,
                  options: {
                    wrap: true,
                    fontSize: '16px',
                  }
                }),
                PropertyFieldCodeEditor('jsCode', {
                  label: 'Javascript',
                  panelTitle: 'Edit Javascript',
                  initialValue: this.properties.jsCode,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'jsEditorFieldId',
                  language: PropertyFieldCodeEditorLanguages.JavaScript,
                  options: {
                    wrap: true,
                    fontSize: '16px',
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
