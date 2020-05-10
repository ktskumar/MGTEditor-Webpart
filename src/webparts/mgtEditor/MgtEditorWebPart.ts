import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './MgtEditorWebPart.module.scss';
import * as strings from 'MgtEditorWebPartStrings';
import { Providers, SharePointProvider } from '@microsoft/mgt';
import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IMgtEditorWebPartProps {  
  htmlCode: string;
  jsCode: string;
}

export default class MgtEditorWebPart extends BaseClientSideWebPart<IMgtEditorWebPartProps> {

  protected async onInit() {
    Providers.globalProvider = new SharePointProvider(this.context);
  }

  public render(): void {
    
    this.domElement.innerHTML = `    
      <div class="${ styles.mgtEditor}">
        <div class="${ styles.container}">
          <div class="${ styles.row}">      
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
                PropertyFieldCodeEditor('htmlCode', {
                  label: 'HTML',
                  panelTitle: 'Edit HTML',
                  initialValue: this.properties.htmlCode,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'codeEditorFieldId',
                  language: PropertyFieldCodeEditorLanguages.HTML
                }),
                PropertyFieldCodeEditor('jsCode', {
                  label: 'Javascript',
                  panelTitle: 'Edit Javascript',
                  initialValue: this.properties.jsCode,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'jsEditorFieldId',
                  language: PropertyFieldCodeEditorLanguages.JavaScript
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
